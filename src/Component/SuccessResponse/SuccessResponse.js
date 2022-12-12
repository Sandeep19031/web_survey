import React, { Fragment } from "react";
import { SafeAreaView, View, Text, Image, StatusBar } from "react-native";
import styles from "./SuccessResponseStyle";
import { Fonts, Colors, Images } from "../../utils";
import { ButtonCustom } from "../../common";
import Singleton from "../../common/Singleton";

class SuccessResponse extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 0,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener("didFocus", (event) => {
      Singleton.getInstance().canGoBack = true;
    });
  }

  render() {
    const { state } = this.props.navigation;
    return (
      <>
        <SafeAreaView style={styles.wrapStyle}>
          <View style={styles.responseSuccess}>
            <Image source={Images.icon_success} />
            <Text style={{ ...styles.titleTextStyle, marginTop: 40 }}>
              Your response has
            </Text>
            <Text style={{ ...styles.titleTextStyle, marginBottom: 16 }}>
              been registered!
            </Text>
            <Text style={styles.textStyle}>
              Thank you for taking the time to
            </Text>
            <Text style={styles.textStyle}>
              complete the survey, your input is valuable to us.
            </Text>
            <Text style={styles.textStyle}>
              {state.params.isSurvey ? "20" : "10"} EXP points will be credited
              to your EQ8 wallet shortly.
            </Text>
          </View>
          <View style={styles.doneButtonStyle}>
            <ButtonCustom
              title={"Done"}
              onPress={() => {
                this.props.navigation.navigate(
                  global.isFromCompleted
                    ? "ComingSoon"
                    : state.params.isSurvey
                    ? "SurveyList"
                    : "MyBadges"
                );
              }}
            />
          </View>
        </SafeAreaView>
        <SafeAreaView style={{ color: Colors.white }}></SafeAreaView>
      </>
    );
  }
}

export default SuccessResponse;
