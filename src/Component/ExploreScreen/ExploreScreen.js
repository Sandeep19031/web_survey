import React, { Fragment } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Linking,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Clipboard,
} from "react-native";
import constant from "../../common/constant";
import ApiStore from "../../Stores/ApiStore";
import Singleton from "../../common/Singleton";
import Loader from "../Loader/Loader";
import styles from "./ExploreScreenStyle";
import {
  Header,
  CardExplore,
  CardExploreCheckbox,
  CardQuestions,
  InputText,
  SelectOption,
  ButtonCustom,
} from "../../common/";
import { Fonts, Colors, Images } from "../../utils";
// import PagerView from "react-native-pager-view";
import ReactPlayer from "react-player";
// import RNFS from "react-native-fs";
import { toast } from "../../common/";
import CountDown from "react-native-countdown-component";
import moment from "moment";
const RNFS = {};
class ExploreScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      questions: [],
      answersList: [],
      answerHashes: [],
      answersSaved: [],
      dropdownArray: [],
      page: 0,
      isLoading: true,
      isSurvey: 0,
      isAnswered: false,
      isScreenOut: false,
      transaction_hash: "",
      isLoadingMedia: false,
      setControls: false,
      fileDuration: 0,
      end_time: 0,
    };
  }

  componentDidMount() {
    StatusBar.setBackgroundColor(Colors.headerBgLight);
    this.setState({
      questions: this.props.questions,
      answersList: this.props.answersList,
      answerHashes: this.props.answerHashes,
      answersSaved: this.props.answersSaved,
      dropdownArray: this.props.dropdownArray,
      page: 0,
      isSurvey: this.props.isSurvey == 1 ? true : false,
      isAnswered: this.props.isAnswered,
      transaction_hash: this.props.transaction_hash,
    });

    if (this.props.isSurvey == 1) {
      const endTime = this.props.endTime;
      let date = new Date(moment(endTime));
      let currentDate = new Date();
      var secDiff = (date.getTime() - currentDate.getTime()) / 1000;
      console.log("-----------endTime---------", secDiff);
      this.setState({ end_time: secDiff });
    } else {
      this.setState({ end_time: 0 });
    }
    //this.downloadMedia(this.props.questions[0]);

    console.log("------------saved answers--------", this.props.answers);
    setTimeout(() => {
      if (
        Array.isArray(this.props.answersList) &&
        this.props.answersList.length > 0
      ) {
        this.checkPreviousLogic(this.props.answersList[0].answer);
        this.setState({ isLoading: false });
      }
    }, 1000);
  }

  downloadMedia(selectedItem) {
    console.log("------selectedItem-----------", selectedItem);

    if (
      selectedItem.media_type != null &&
      selectedItem.media_type != "" &&
      selectedItem.media != null &&
      selectedItem.media != ""
    ) {
      this.setState({ isLoadingMedia: true });
      const url = "https://ipfs.io/ipfs/" + selectedItem.media;
      const path = `${selectedItem.media}${
        selectedItem.media_type == "photo"
          ? ".png"
          : selectedItem.media_type == "video"
          ? ".mp4"
          : ".mp3"
      }`;
      Singleton.getInstance()
        .downloadIPFSFile(url, path)
        .then((res) => {
          console.log("-------------media url------------", res);
          setTimeout(() => {
            this.setState({ isLoadingMedia: false });
          }, 500);
          setTimeout(() => {
            this.setState({ setControls: true });
          }, 1000);
        })
        .catch((err) => {
          //this.downloadMedia(selectedItem);
        });
    }
  }

  checkPreviousLogic = (options) => {
    let isScreenOut = false;
    console.log("------------selectedObj--------", options);

    if (options != null && options != "") {
      for (let i = 0; i < options.length; i++) {
        const element = options[i];
        if (element.selected && element.screenOut) {
          isScreenOut = true;
          break;
        }
      }
    }
    this.setState({ isScreenOut: isScreenOut });
  };

  nextClicked = () => {
    const { questions, page, answersList, answerHashes, isLoading } =
      this.state;

    console.log(
      "---------this.state.answersSaved----------",
      this.state.answersSaved
    );

    let currentPage = page;
    let saved = this.state.answersSaved;
    console.log("Answer", answersList[currentPage].answer);

    //Check if not selected any value
    let filtered =
      Array.isArray(answersList[currentPage].answer) &&
      answersList[currentPage].answer.find((el) => el.selected == true);
    console.log("filtered", filtered);
    if (!filtered) {
      console.log("---------type----------", answersList[currentPage]);
      // if (!this.state.isSurvey && currentPage == this.state.questions.length - 1) {
      //   // if user want to skip last question
      //   this.setState({ isLoading: true })
      //   this.props.pushToBlockChain(answerHashes)
      //   return
      // }

      if (answersList[currentPage].type == constant.text) {
        alert("Please enter any value");
      } else {
        alert("Please select any value");
      }
      return;
    }

    if (this.player) {
      this.player.seek(this.state.fileDuration, 0);
      // this.setState({ fileDuration: 0 })
      // this.player = undefined
    }

    if (saved == null) {
      saved = [];
      saved.push(answersList[currentPage]);
    } else {
      const filtered =
        Array.isArray(saved) &&
        saved.find(
          (el) =>
            el.contract_question_id ==
            answersList[currentPage].contract_question_id
        );
      if (filtered) {
        saved[saved.indexOf(filtered)] = answersList[currentPage];
      } else {
        saved.push(answersList[currentPage]);
      }
    }

    console.log("-------------currentPage-------------", currentPage);
    console.log("-------------saved-------------", saved);

    let data = answersList[currentPage];
    let selectedAnswer = [];
    let submittedAnswer = [];
    let moveToPage = currentPage + 1;

    //Find the selected answer
    const elementArray =
      Array.isArray(data.answer) &&
      data.answer.filter((el) => el.selected == true);
    for (let i = 0; i < elementArray.length; i++) {
      const element = elementArray[i];
      console.log("-----------element-------------", element);
      if (element) {
        //Check if selected but with empty value
        if (element.submittedAnswer.trim() == "") {
          alert("Please enter any value");
          return;
        }
        if (element.skipTo != null && element.skipTo != "") {
          //Skip Logic
          moveToPage = answersList.findIndex(
            (a) => a.question_id == element.skipTo
          );
          let obj = answersList[moveToPage];
          obj.back_to = answersList[currentPage].question_id;
          answersList[moveToPage] = obj;
          this.setState({ answersList: [...answersList] });
          const filtered =
            Array.isArray(saved) &&
            saved.find(
              (el) => el.contract_question_id == obj.contract_question_id
            );
          if (filtered) {
            saved[saved.indexOf(filtered)] = obj;
          } else {
            saved.push(obj);
          }
        } else {
          // Remove back to if previously selected
          if (element.remove_back_to != null && element.remove_back_to != "") {
            let removeBackArray = element.remove_back_to.split(",");
            for (
              let removeIndex = 0;
              removeIndex < removeBackArray.length;
              removeIndex++
            ) {
              const removeElement = removeBackArray[removeIndex];
              let index = answersList.findIndex(
                (a) => a.question_id == removeElement
              );
              let obj = answersList[index];
              obj.back_to = null;
              answersList[index] = obj;
              this.setState({ answersList: [...answersList] });
              console.log("----------obj---------", obj);
              const filtered =
                Array.isArray(saved) &&
                saved.find(
                  (el) => el.contract_question_id == obj.contract_question_id
                );
              if (filtered) {
                saved[saved.indexOf(filtered)] = obj;
              } else {
                saved.push(obj);
              }
            }
          }
        }
        selectedAnswer.push(element.answer);
        submittedAnswer.push(element.submittedAnswer);
      }
    }

    this.setState({ isLoading: true });
    this.setState({ answersSaved: saved });
    Singleton.getInstance().saveData(
      `${this.props.answerKey}${this.props.badge_id}`,
      JSON.stringify(saved)
    );
    console.log(
      "-----------submittedAnswer----------",
      submittedAnswer.join(",")
    );

    if (submittedAnswer.length > 0) {
      if (this.state.isAnswered && this.state.isSurvey) {
        this.pager.setPage(moveToPage);
        //this.downloadMedia(this.props.questions[moveToPage]);
        this.setState({ page: moveToPage, isLoading: false });
      } else {
        this.createIpfsHash(
          submittedAnswer,
          selectedAnswer,
          answersList,
          currentPage,
          answerHashes,
          questions,
          page,
          moveToPage
        );
      }
    } else if (page == questions.length - 1) {
      /// Submit Survey
      this.setState({ isLoading: false });
      this.props.pushToBlockChain(answerHashes);
    } else {
      this.pager.setPage(moveToPage);
      //this.downloadMedia(this.props.questions[moveToPage]);
      this.setState({ page: moveToPage, isLoading: false });
      this.checkScreenOutForPreviousSelectedData(answersList[moveToPage]);
    }
  };

  checkScreenOutForPreviousSelectedData = (data) => {
    const selectedAnswer = data.answer.find((el) => el.selected == true);
    this.setState({ isScreenOut: false });
    if (selectedAnswer && selectedAnswer.screenOut) {
      this.setState({ isScreenOut: true });
    }
    // else {
    //   this.setState({ isScreenOut: false })
    // }
    this.checkPreviousLogic(data.answer);
  };

  createIpfsHash = (
    submittedAnswer,
    selectedAnswer,
    answersList,
    currentPage,
    answerHashes,
    questions,
    page,
    moveToPage
  ) => {
    ApiStore.getInstance()
      .saveDataToIPFS(submittedAnswer)
      .then((hash) => {
        let answerObj = {
          answer: selectedAnswer,
          submittedAnswer: submittedAnswer,
          question_id: answersList[currentPage].question_id,
          badge_id: this.props.badge_id,
          hash: hash,
          contract_survey_id: this.props.survey_id,
          contract_question_id: answersList[currentPage].contract_question_id,
          back_to: answersList[currentPage].back_to,
        };

        let hashes = answerHashes;
        if (hashes == null) {
          hashes = [];
          hashes.push({
            questionId: answersList[currentPage].contract_question_id,
            answerURI: hash,
            surveyId: this.props.survey_id,
            answerObj: answerObj,
          });
        } else {
          const filtered =
            Array.isArray(hashes) &&
            hashes.find(
              (el) =>
                el.questionId == answersList[currentPage].contract_question_id
            );
          if (filtered) {
            hashes[hashes.indexOf(filtered)].hash = hash;
            hashes[hashes.indexOf(filtered)].answerObj = answerObj;
          } else {
            hashes.push({
              questionId: answersList[currentPage].contract_question_id,
              answerURI: hash,
              surveyId: this.props.survey_id,
              answerObj: answerObj,
            });
          }
        }
        if (page < questions.length - 1 && !this.state.isScreenOut) {
          Singleton.getInstance().saveData(
            `${this.props.hashesKey}${this.props.badge_id}`,
            JSON.stringify(hashes)
          );
          const skipPage = this.compoundBranchingLogic(
            answersList[currentPage + 1]
          );
          if (skipPage) {
            moveToPage = moveToPage + 1;
            if (moveToPage >= questions.length - 1) {
              /// Submit Survey
              this.setState({ answerHashes: hashes, isLoading: false });
              Singleton.getInstance().saveData(
                `${this.props.hashesKey}${this.props.badge_id}`,
                JSON.stringify(hashes)
              );
              this.props.pushToBlockChain(hashes);
            } else {
              answersList[moveToPage].back_to =
                answersList[currentPage].question_id;
            }
          } else {
            if (answersList.length > moveToPage + 1) {
              answersList[moveToPage + 1].back_to = null;
            }
          }

          this.pager.setPage(moveToPage);
          // this.downloadMedia(this.props.questions[moveToPage]);
          this.setState({
            answerHashes: hashes,
            page: moveToPage,
            answersList: [...answersList],
            isLoading: false,
          });
          this.checkScreenOutForPreviousSelectedData(answersList[moveToPage]);
        } else {
          /// Submit Survey
          if (this.state.isScreenOut) {
            this.setState({ answerHashes: hashes, isLoading: false });
            Singleton.getInstance().saveData(
              `${this.props.hashesKey}${this.props.badge_id}`,
              JSON.stringify(hashes)
            );
            this.props.saveScreenOutData(hashes);
          } else {
            this.setState({ answerHashes: hashes, isLoading: false });
            Singleton.getInstance().saveData(
              `${this.props.hashesKey}${this.props.badge_id}`,
              JSON.stringify(hashes)
            );
            this.props.pushToBlockChain(hashes);
          }
        }
      })
      .catch((err) => {
        this.setState({ isLoading: false });
        alert(`${err.message} Please try again after few seconds.`);
      });
  };

  compoundBranchingLogic = (data) => {
    if (data.compound_branching != undefined) {
      const compoundBranchArray = JSON.parse(data.compound_branching);
      for (let i = 0; i < compoundBranchArray.length; i++) {
        const element = compoundBranchArray[i];
        const selectedElement = this.state.answersList.find(
          (el) => el.question_id == element.question_id
        );
        const selectedOptionArray = selectedElement.answer.filter(
          (el) => el.selected == true
        );
        const checkBranching = selectedOptionArray.every(
          (el) => el.index == element.value
        );
        if (!checkBranching) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  skipClicked = () => {
    let moveToPage = this.state.page + 1;

    // Skip to question
    let obj = this.state.answersList[this.state.page];
    let saved = this.state.answersSaved;
    const filtered =
      Array.isArray(saved) &&
      saved.find((el) => el.contract_question_id == obj.contract_question_id);
    console.log("------------filtered--------", obj.contract_question_id);
    if (filtered) {
      const filteredAnswer =
        Array.isArray(filtered.answer) &&
        filtered.answer.find((el) => el.selected == true);
      if (filteredAnswer) {
        if (filteredAnswer.skipTo != null && filteredAnswer.skipTo != "") {
          //Skip Logic
          moveToPage = this.state.answersList.findIndex(
            (a) => a.question_id == filteredAnswer.skipTo
          );
        }
      }
    }

    this.pager.setPage(moveToPage);
    // this.downloadMedia(this.props.questions[moveToPage]);
    this.setState({ page: moveToPage });
    this.checkScreenOutForPreviousSelectedData(
      this.state.answersList[moveToPage]
    );
  };

  backPageClicked = () => {
    let moveToPage = this.state.page - 1;
    let obj = this.state.answersList[this.state.page];
    console.log("---------objback----------", obj);
    if (obj.back_to != null && obj.back_to != "") {
      moveToPage = this.state.answersList.findIndex(
        (a) => a.question_id == obj.back_to
      );
    }
    this.pager.setPage(moveToPage);
    //this.downloadMedia(this.props.questions[moveToPage]);
    this.setState({ page: moveToPage, isScreenOut: false });
    this.checkScreenOutForPreviousSelectedData(
      this.state.answersList[moveToPage]
    );
  };

  checkExclusive = (data, isExclusiveSelected) => {
    let exclusiveObj = data.find((a) => a.exclusive == true);
    if (exclusiveObj && exclusiveObj.selected) {
      return data.map((value, index, array) => {
        if (isExclusiveSelected && !value.exclusive) {
          value.selected = false;
        } else if (!isExclusiveSelected && value.exclusive) {
          value.selected = false;
        }
      });
    } else {
      return data;
    }
  };

  renderMedia = (item) => {
    const path = `${item.media}${
      item.media_type == "photo"
        ? ".png"
        : item.media_type == "video"
        ? ".mp4"
        : ".mp3"
    }`;

    if (item.media_type == "video" || item.media_type == "audio") {
      console.log(
        "---------updated path----------",
        `${RNFS.DocumentDirectoryPath}/${path}`
      );
      return (
        <View style={styles.vwMedia}>
          {this.state.isLoadingMedia ? (
            <ActivityIndicator
              color={"gray"}
              animating
              style={styles.indicatorStyle}
            />
          ) : (
            <ReactPlayer
              url={{ uri: "https://ipfs.io/ipfs/" + item.media }}
              ref={(ref) => {
                this.player = ref;
              }}
              paused={true}
              style={{ width: "100%", height: 300, backgroundColor: "black" }}
              onError={(error) => {
                console.log("-------------error-----------", error);
                if (
                  error.error.errorString == "ExoPlaybackException type : 1"
                ) {
                  this.setState({ isLoadingMedia: false });
                  setTimeout(() => {
                    this.setState({ setControls: true });
                  }, 1000);
                } else {
                  this.setState({ isLoadingMedia: true });
                  const url = "https://ipfs.io/ipfs/" + item.media;
                  const path = `${item.media}${
                    item.media_type == "photo"
                      ? ".png"
                      : item.media_type == "video"
                      ? ".mp4"
                      : ".mp3"
                  }`;
                  Singleton.getInstance()
                    .deleteLocalFile(url, path)
                    .then((filePath) => {
                      this.setState({ isLoadingMedia: false });
                      setTimeout(() => {
                        this.setState({ setControls: true });
                      }, 1000);
                    });
                }
              }}
              // fullscreen
              controls={this.state.setControls}
              resizeMode={"contain"}
              onLoad={(data) => {
                this.setState({ fileDuration: data.duration });
              }}
            />
          )}
          {!this.state.isLoadingMedia && path.includes("mp3") && (
            <Image
              style={{ position: "absolute", width: 100, height: 100 }}
              resizeMode="center"
              source={Images.icon_audio}
            />
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.vwMedia}>
          {this.state.isLoadingMedia ? (
            <ActivityIndicator
              color={"gray"}
              animating
              style={styles.indicatorStyle}
            />
          ) : (
            <TouchableOpacity
              disabled={true}
              style={{ width: "100%", height: "100%" }}
              onPress={() => {
                // this.setState({ mediaModel: true })
              }}
            >
              <Image
                style={{ width: "100%", height: 300 }}
                source={{ uri: "https://ipfs.io/ipfs/" + item.media }}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    }
  };

  renderAnswerObj({ index, answerArray, value }) {
    const {
      questions,
      page,
      answersList,
      answerHashes,
      isLoading,
      selectedAnswerDropdown,
      dropdownArray,
      isSurvey,
      isAnswered,
    } = this.state;
    console.log("-------renderAnswerObj---------", answerArray);
    let indexOfSelectedAnswer = answerArray.findIndex((a) =>
      a.answer.includes(constant.other || "Other, please specify")
    );
    this.index == undefined ? (this.index = 0) : (this.index = this.index + 1);
    console.log("-------index---------", this.index);
    if (answerArray.length > 5) {
      return (
        <View>
          <SelectOption
            items={answerArray}
            value={dropdownArray[index]}
            onPressCheckBox={(indexAnswer) => {
              console.log("isSurvey", isSurvey + " -- " + isAnswered);
              if (isSurvey && isAnswered) {
                return;
              }
              let answersObj = answerArray[indexAnswer];
              answersObj.selected = !answersObj.selected;
              console.log("answersObj.answer", answersObj.answer);
              if (
                answersObj.answer == constant.other ||
                answersObj.answer == "Other, please specify"
              ) {
                answersObj.submittedAnswer = "";
              } else {
                answersObj.submittedAnswer = answersObj.answer;
              }
              answerArray[indexAnswer] = answersObj;
              this.checkExclusive(answerArray, answersObj.exclusive);
              let question = answersList;
              question[index].answer = answerArray;

              let tempDropdownArray = answerArray.filter(
                (a) => a.selected == true
              );
              let temp = tempDropdownArray.map((value, index, array) => {
                return value.answer;
              });
              dropdownArray[index] = temp.join(",");
              // let tempDropdownArray = dropdownArray[index].split(',')
              // if (tempDropdownArray.includes(answersObj.answer)) {
              //   screenOut = false
              //   tempDropdownArray.splice(tempDropdownArray.findIndex(a => a === answersObj.answer), 1)
              // } else {
              //   screenOut = !screenOut && answersObj.screenOut
              //   tempDropdownArray.push(answersObj.answer)
              // }
              // if (tempDropdownArray.includes("")) {
              //   tempDropdownArray.splice(tempDropdownArray.findIndex(a => a === ""), 1)
              // }

              // let temp = dropdownArray
              // temp[index] = tempDropdownArray.join(',')
              let screenout = false;
              for (let index = 0; index < answerArray.length; index++) {
                const element = answerArray[index];
                if (element.selected && element.screenOut) {
                  screenout = true;
                }
              }
              this.setState({
                answersList: question,
                dropdownArray: [...dropdownArray],
                isScreenOut: screenout,
              });
              console.log("---------questions---------", question[index]);
              this.checkPreviousLogic(question[index].answer);
            }}
            onPress={(indexAnswer) => {
              if (isSurvey && isAnswered) {
                return;
              }
              for (let k = 0; k < answerArray.length; k++) {
                let answersObj = answerArray[k];
                if (k == indexAnswer) {
                  answersObj.selected = true;
                  console.log("Answer is", answersObj.answer);
                  if (
                    answersObj.answer == constant.other ||
                    answersObj.answer == "Other, please specify"
                  ) {
                    answersObj.submittedAnswer = "";
                  } else {
                    answersObj.submittedAnswer =
                      k == indexOfSelectedAnswer ? "" : answersObj.answer;
                  }
                } else {
                  answersObj.selected = false;
                }
                answerArray[k] = answersObj;
              }
              let question = answersList;
              question[index].answer = answerArray;

              let answersObj = answerArray[indexAnswer];

              let temp = dropdownArray;
              temp[index] = answersObj.answer;
              this.setState({
                answersList: question,
                dropdownArray: temp,
                isScreenOut: answersObj.screenOut,
              });
            }}
          />
          {dropdownArray[index].includes(
            constant.other || "Other, please specify"
          ) && (
            <InputText
              placeholder="enter text"
              maxLength={120}
              editable={isSurvey && isAnswered ? false : true}
              multiline={true}
              inputstyle={{
                minHeight: 40,
                maxHeight: 120,
                height: undefined,
                paddingTop: 15,
                paddingBottom: 15,
                marginBottom: 10,
                marginHorizontal: 10,
              }}
              value={answerArray[indexOfSelectedAnswer].submittedAnswer}
              onChangeText={(text) => {
                let answersObj = answerArray[indexOfSelectedAnswer];
                answersObj.submittedAnswer = text;

                answerArray[indexOfSelectedAnswer] = answersObj;
                let question = answersList;
                question[index].answer = answerArray;
                this.setState({
                  answersList: question,
                  isScreenOut: answersObj.screenOut,
                });
              }}
            ></InputText>
          )}
          <View style={{ flex: 1 }}></View>
        </View>
      );
    } else {
      return answerArray.map((answer, indexAnswer) => {
        if (value.type.toLowerCase() == constant.single) {
          return (
            <View>
              <CardExplore
                title={answer.answer}
                isChecked={answer.selected ? true : false}
                onPress={() => {
                  console.log("isSurvey 602", isSurvey + " -- " + isAnswered);
                  if (isSurvey && isAnswered) {
                    return;
                  }
                  let screenOut = false;
                  for (let k = 0; k < answerArray.length; k++) {
                    let answersObj = answerArray[k];
                    if (k == indexAnswer) {
                      answersObj.selected = true;
                      answersObj.submittedAnswer =
                        k == indexOfSelectedAnswer ? "" : answersObj.answer;
                      screenOut = !screenOut && answersObj.screenOut;
                    } else {
                      answersObj.selected = false;
                    }
                    answerArray[k] = answersObj;
                  }
                  let question = answersList;
                  question[index].answer = answerArray;
                  this.setState({
                    answersList: question,
                    isScreenOut: screenOut,
                  });
                }}
              />
              {answer.answer.includes(
                constant.other || "Other, please specify"
              ) &&
                answer.selected && (
                  <InputText
                    placeholder="enter text"
                    maxLength={120}
                    editable={isSurvey && isAnswered ? false : true}
                    multiline={true}
                    inputstyle={{
                      minHeight: 40,
                      maxHeight: 120,
                      height: undefined,
                      paddingTop: 15,
                      paddingBottom: 15,
                      marginBottom: 10,
                    }}
                    value={answer.submittedAnswer}
                    onChangeText={(text) => {
                      let answersObj = answer;
                      answersObj.submittedAnswer = text;
                      answer = answersObj;
                      let question = answersList;
                      question[index].answer[indexAnswer] = answer;
                      this.setState({
                        answersList: question,
                        isScreenOut: answersObj.screenOut,
                      });
                    }}
                  ></InputText>
                )}
            </View>
          );
        } else {
          return (
            <View>
              <CardExploreCheckbox
                keyVal={answer.answer + answersList[index].contract_question_id}
                title={answer.answer}
                isChecked={answer.selected ? true : false}
                onPress={() => {
                  if (isSurvey && isAnswered) {
                    return;
                  }
                  let answers = answersList[index].answer;
                  let answersObj = answerArray[indexAnswer];
                  if (
                    answersObj.answer != constant.other ||
                    answersObj.answer != "Other, please specify"
                  ) {
                    answersObj.submittedAnswer = answersObj.answer;
                  }
                  answersObj.selected = !answersObj.selected;
                  answers[indexAnswer] = answersObj;
                  this.checkExclusive(answerArray, answersObj.exclusive);
                  let question = answersList;
                  question[index].answer = answers;
                  let screenout = false;
                  for (let index = 0; index < answers.length; index++) {
                    const element = answers[index];
                    if (element.selected && element.screenOut) {
                      screenout = true;
                    }
                  }
                  this.setState({
                    answersList: question,
                    isScreenOut: screenout,
                  });
                }}
              />
              {answer.answer.includes(
                constant.other || "Other, please specify"
              ) &&
                answer.selected && (
                  <InputText
                    placeholder="enter text"
                    maxLength={120}
                    multiline={true}
                    editable={isSurvey && isAnswered ? false : true}
                    inputstyle={{
                      minHeight: 40,
                      maxHeight: 120,
                      height: undefined,
                      paddingTop: 15,
                      paddingBottom: 15,
                      marginBottom: 10,
                    }}
                    value={answer.submittedAnswer}
                    onChangeText={(text) => {
                      let answersObj = answer;
                      answersObj.submittedAnswer = text;
                      answer = answersObj;
                      let question = answersList;
                      question[index].answer[indexAnswer] = answer;
                      this.setState({
                        answersList: question,
                        isScreenOut: answersObj.screenOut,
                      });
                    }}
                  ></InputText>
                )}
            </View>
          );
        }
      });
    }
  }

  render() {
    const {
      questions,
      page,
      answersList,
      isLoading,
      isSurvey,
      isAnswered,
      transaction_hash,
    } = this.state;
    console.log("----------answer list -----------", answersList);
    console.log("----------isSurvey -----------", isSurvey);
    return (
      <>
        <SafeAreaView style={styles.wrapStyle}>
          <Header
            title={this.props.surveyName}
            leftIcon
            onPressLeftLink={() => {
              this.props.goBack();
            }}
            iconLeft={Images.arrow_back_header}
            // BadgeExplore uncomment answerHashes={this.state.answerHashes}
            // rightTitle={'Skip'}
            // rightIcon={isSurvey ? false : page < questions.length - 1 ? true : false}
            // onPressRightLink={this.skipClicked}
          />
          {isAnswered && (
            <View style={styles.assetSingleHeader}>
              <TouchableOpacity
                style={styles.hashBtn}
                onPress={() =>
                  Linking.openURL(
                    constant.network == "testnet"
                      ? "https://mumbai.polygonscan.com/tx/" + transaction_hash
                      : "https://polygonscan.com/tx/" + transaction_hash
                  )
                }
              >
                <Text
                  style={{ fontSize: 13 }}
                  numberOfLines={1}
                  ellipsizeMode={"middle"}
                >
                  Txn Hash:{" "}
                </Text>
                <Text
                  style={styles.addressTextStyle}
                  numberOfLines={1}
                  ellipsizeMode={"middle"}
                >
                  {transaction_hash}
                </Text>
              </TouchableOpacity>
              {answersList[page].hash != null && answersList[page].hash != "" && (
                <TouchableOpacity
                  style={styles.hashBtn}
                  onPress={() => {
                    Clipboard.setString(answersList[page].answer_ipfs_hash);
                    this.refs.toast.info("IPFS Hash Copied");
                    //Linking.openURL("https://ipfs.io/ipfs/" + answersList[page].answer_ipfs_hash)}
                  }}
                >
                  <Text
                    style={{ fontSize: 13 }}
                    numberOfLines={1}
                    ellipsizeMode={"middle"}
                  >
                    IPFS Hash:{" "}
                  </Text>
                  <Text
                    style={styles.addressTextStyle}
                    numberOfLines={1}
                    ellipsizeMode={"middle"}
                  >
                    {answersList[page].answer_ipfs_hash}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {this.state.end_time > 0 && this.state.isSurvey && (
            <View style={{ marginTop: 20 }}>
              <CountDown
                size={20}
                until={this.state.end_time}
                onFinish={() => {}}
                digitStyle={styles.digitStyle}
                digitTxtStyle={styles.digitTextStyle}
                timeLabelStyle={styles.timeLabel}
                separatorStyle={styles.separatorStyle}
                timeToShow={["D", "H", "M", "S"]}
                timeLabels={{ d: "DD", h: "HH", m: "MM", s: "SS" }}
                showSeparator
              />
            </View>
          )}
          {/* <PagerView
            ref={(ref) => (this.pager = ref)}
            style={styles.pagerView}
            initialPage={0}
            scrollEnabled={false}
            onPageSelected={(event) => {
              console.log(event.nativeEvent.position);
              this.setState({ selectedPage: event.nativeEvent.position });
            }}
          > */}
          {questions.map((value, index) => {
            let answerArray = answersList[index].answer;
            console.log(
              "---------contract_question_id------------",
              value.contract_question_id
            );
            return (
              <ScrollView
                style={styles.wrapScreen}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                key={value.contract_question_id}
              >
                <CardQuestions
                  questionNumber={index + 1 + "/" + questions.length}
                  question={value.question}
                />
                {value.media_type != null &&
                  value.media_type != "" &&
                  value.media != null &&
                  value.media != "" &&
                  this.renderMedia(value)}
                {value.type == constant.text ? (
                  <InputText
                    placeholder="enter text"
                    maxLength={120}
                    multiline={true}
                    editable={isSurvey && isAnswered ? false : true}
                    inputstyle={{
                      minHeight: 40,
                      maxHeight: 120,
                      height: undefined,
                      paddingTop: 15,
                      paddingBottom: 15,
                      marginBottom: 10,
                    }}
                    value={answerArray[0].answer}
                    onChangeText={(text) => {
                      let answersObj = answerArray[0];
                      answersObj.selected = text.length == 0 ? false : true;
                      answersObj.answer = text;
                      answersObj.submittedAnswer = text;
                      answerArray[0] = answersObj;
                      let question = answersList;
                      question[index].answer = answerArray;
                      this.setState({ answersList: question });
                    }}
                  >
                    {/* <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.charcterLimit}>Character Limit: </Text>
                      <Text style={{ ...styles.charcterLimit, color: Colors.textheighlighted }}>25</Text>
                    </View> */}
                  </InputText>
                ) : (
                  this.renderAnswerObj({ index, answerArray, value })
                )}

                <View style={{ flex: 1, minHeight: 20 }}></View>
                {(page == questions.length - 1 || this.state.isScreenOut) &&
                isSurvey &&
                isAnswered ? (
                  page > 0 ? (
                    <ButtonCustom
                      styleLinear={{ width: "100%" }}
                      title={"Back"}
                      onPress={this.backPageClicked}
                      back
                    />
                  ) : (
                    <View></View>
                  )
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 25,
                    }}
                  >
                    {page > 0 && (
                      <ButtonCustom
                        styleLinear={{ width: "48%", marginBottom: 25 }}
                        title={"Back"}
                        onPress={this.backPageClicked}
                        back
                      />
                    )}
                    <ButtonCustom
                      styleLinear={{
                        width: page > 0 ? "48%" : "100%",
                        marginBottom: 25,
                      }}
                      title={
                        page < questions.length - 1 && !this.state.isScreenOut
                          ? "Next"
                          : "Submit"
                      }
                      onPress={this.nextClicked}
                    />
                  </View>
                )}
              </ScrollView>
            );
          })}
          {/* </PagerView> */}
        </SafeAreaView>
        <SafeAreaView style={{ flex: 0 }} />
        {isLoading && <Loader color="white" />}
      </>
    );
  }
}

export default ExploreScreen;
