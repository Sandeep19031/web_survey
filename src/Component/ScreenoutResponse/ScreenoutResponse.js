import React, { Fragment } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import styles from "./ScreenoutResponseStyle";
import { Fonts, Colors, Images } from "../../utils";
import { ButtonCustom } from "../../common";
import Singleton from "../../common/Singleton";

class ScreenoutResponse extends React.Component {
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
            {/* <Image source={Images.icon_success} /> */}
            <Text style={{ ...styles.titleTextStyle, marginTop: 40 }}>
              We’re sorry.
            </Text>
            <Text style={{ ...styles.titleTextStyle, marginBottom: 16 }}>
              You do not meet the qualification criteria for this survey.
            </Text>
            <Text style={styles.textStyle}>
              We sincerely thank you and appreciate your time, dedication,
            </Text>
            <Text style={styles.textStyle}>
              and continued participation in our online surveys.
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

export default ScreenoutResponse;
