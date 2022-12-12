import React, { Fragment } from "react";
import { SafeAreaView, View, Text, FlatList } from "react-native";
import styles from "./BadgeExploreStyle";
import { Header } from "../../common";
import { Fonts, Colors, Images } from "../../utils";
import ApiStore from "../../Stores/ApiStore";
import ExploreScreen from "../ExploreScreen/ExploreScreen";
import Singleton from "../../common/Singleton";
import Loader from "../Loader/Loader";
import constant from "../../common/constant";
import LayoutCard from "../LayoutCard/LayoutCard";

class BadgeExplore extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answersList: [],
      dropdownArray: [],
      answerHashes: [],
      answersSaved: [],
      isLoading: false,
      loaderText: "",
    };
  }

  componentDidMount() {
    const { state } = this.props.navigation;
    this.props.navigation.addListener("didFocus", (event) => {
      Singleton.getInstance().canGoBack = false;
    });

    Singleton.getInstance()
      .getData(`Answer_hashes_${state.params.badge_id}`)
      .then((res) => {
        let hashesData = JSON.parse(res);
        Singleton.getInstance()
          .getData(`Answers_${state.params.badge_id}`)
          .then((res) => {
            let savedData = JSON.parse(res);
            this.setState({
              answerHashes: hashesData,
              answersSaved: savedData,
            });
            setTimeout(() => {
              this.getQuestions(state.params.badge_id);
            }, 1000);
          });
      });
    ApiStore.getInstance()
      .addStartTime(state.params.badge_id)
      .then((res) => console.log("This is to start the time", res))
      .catch((res) => console.log("This is Error start the time", res));
  }

  getQuestions(badge_id) {
    const { state } = this.props.navigation;
    ApiStore.getInstance()
      .getQuestions(badge_id)
      .then((response) => {
        let answersList = [];
        let tempDropdownArray = [];
        for (let i = 0; i < response.questions.length; i++) {
          const element = response.questions[i];
          const filtered =
            Array.isArray(this.state.answersSaved) &&
            this.state.answersSaved.find((el) => el.question_id == element.id);
          console.log("--------BadgeExplore filtered-------", filtered);
          let answers = [];
          let options = element.options;
          if (typeof options == "string") {
            options = JSON.parse(element.options);
          }
          let joinedDropdwonArray = [];

          for (let j = 0; j < options.length; j++) {
            const answerElement = options[j];
            let selected = false;
            let submittedAnswer = "";
            if (filtered) {
              selected = filtered.answer[j].selected;
              if (selected) {
                joinedDropdwonArray.push(filtered.answer[j].answer);
                submittedAnswer = filtered.answer[j].submittedAnswer;
              }
            } else {
              selected = answerElement.selected;
              if (selected) {
                joinedDropdwonArray.push(answerElement.answer);
                submittedAnswer =
                  answerElement.answer != null && answerElement.answer;
              }
            }
            let answerObj = {
              remove_back_to: answerElement.remove_back_to,
              skipTo: answerElement.skipTo,
              selected: selected,
              answer: !filtered
                ? answerElement.answer
                : filtered.answer[j].answer,
              index: j,
              submittedAnswer: submittedAnswer,
              type: element.type,
              screenOut:
                answerElement.screenOut != undefined
                  ? answerElement.screenOut
                  : false,
              exclusive: answerElement.exclusive,
            };
            answers.push(answerObj);
          }
          tempDropdownArray.push(joinedDropdwonArray.join(","));
          let obj = {
            answer: answers,
            question_id: element.id,
            hash: element.hash,
            badge_id: response.badge_id,
            survey_id: state.params.survey_id,
            userId: 1,
            walletAddress: "",
            contract_question_id: element.contract_question_id,
            back_to: !filtered ? element.back_to : filtered.back_to,
            type: element.type,
            // compound_branching: element.id == 3 ? "[{\"question_id\":1,\"value\":[1]},{\"question_id\":2,\"value\":[0]}]" : undefined
            compound_branching: element.compound_branching,
            answer_ipfs_hash: element.answer_ipfs_hash,
          };
          answersList.push(obj);
        }
        console.log("----Badge Explore----answerList---------", answersList);
        this.setState({
          questions: response.questions,
          answersList: answersList,
          dropdownArray: tempDropdownArray,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  pushToBlockChain(answerHashes) {
    const { state } = this.props.navigation;

    let hashes = answerHashes;
    console.log("------------Hashes-------------", hashes);
    if (hashes.length == 0) {
      alert("Please answer at least one question");
      return;
    }
    let answerURI = [];
    let questionIds = [];
    let surveyId = 0;
    let answerObjArray = [];
    for (let i = 0; i < hashes.length; i++) {
      const element = hashes[i];
      answerURI.push(element.answerURI);
      questionIds.push(element.questionId);
      surveyId = element.surveyId;
      answerObjArray.push(element.answerObj);
    }

    console.log("------------answerObjArray-----------", answerObjArray);
    this.setState({ isLoading: true, loaderText: constant.appKillAlert });
    ApiStore.getInstance()
      .saveDataToIPFS(answerURI)
      .then((mainAnswerUris) => {
        Singleton.getInstance()
          .submitAnswer(mainAnswerUris, questionIds, surveyId, answerObjArray)
          .then((res) => {
            this.setState({ isLoading: false, loaderText: "" });
            this.props.navigation.navigate("SuccessResponse", {
              isSurvey: state.params.isSurvey,
            });
          })
          .catch((err) => {
            console.log("----------errror-------------", err);
            alert(err.message);
            this.setState({ isLoading: false, loaderText: "" });
          });
      });
  }

  saveScreenOutData(answerHashes) {
    const { state } = this.props.navigation;

    let hashes = answerHashes;
    console.log("------------Hashes-------------", hashes);
    if (hashes.length == 0) {
      alert("Please answer at least one question");
      return;
    }

    let surveyId = 0;
    let answerObjArray = [];
    for (let i = 0; i < hashes.length; i++) {
      const element = hashes[i];
      surveyId = element.surveyId;
      answerObjArray.push(element.answerObj);
    }

    console.log("------------answerObjArray-----------", answerObjArray);
    this.setState({ isLoading: true });
    let params = {
      answersArray: JSON.stringify(answerObjArray),
      screen_out: 1,
    };
    console.log("-----------params answer submission-------", answerObjArray);
    ApiStore.getInstance()
      .updateAnswers(params)
      .then((res) => {
        this.setState({ isLoading: false });
        this.props.navigation.navigate("ScreenoutResponse", {
          isSurvey: state.params.isSurvey,
        });
      })
      .catch((err) => {
        alert(err.message);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <LayoutCard title="">
        <SafeAreaView style={styles.wrapStyle}>
          {this.state.questions.length > 0 ? (
            <ExploreScreen
              badge_id={state.params.badge_id}
              survey_id={state.params.survey_id}
              surveyName={state.params.surveyName}
              goBack={() => this.props.navigation.goBack()}
              hashesKey="Answer_hashes_"
              answerKey={"Answers_"}
              isLoading={this.state.isLoading}
              questions={this.state.questions}
              answersList={this.state.answersList}
              dropdownArray={this.state.dropdownArray}
              //answerHashes={this.state.answerHashes} commented if skip button is disabled
              answersSaved={this.state.answersSaved}
              pushToBlockChain={(answerHashes) =>
                this.pushToBlockChain(answerHashes)
              }
              saveScreenOutData={(answerHashes) =>
                this.saveScreenOutData(answerHashes)
              }
              isSurvey={state.params.isSurvey}
              isAnswered={state.params.isAnswered}
              transaction_hash={state.params.transaction_hash}
              endTime={state.params.endTime}
            />
          ) : (
            <Header
              title={state.params.surveyName}
              leftIcon
              onPressLeftLink={() => {
                this.props.navigation.goBack();
              }}
              iconLeft={Images.arrow_back_header}
            />
          )}
        </SafeAreaView>
        <SafeAreaView style={{ color: Colors.white }}></SafeAreaView>
        {this.state.isLoading && <Loader text={this.state.loaderText} />}
      </LayoutCard>
    );
  }
}

export default BadgeExplore;
