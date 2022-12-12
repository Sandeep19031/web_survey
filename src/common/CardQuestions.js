import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-web-linear-gradient";
import { Fonts, Images, Colors } from "../utils/";

const CardQuestions = (props) => {
  return (
    <View style={styles.questionWrap}>
      <Text style={styles.questionWrap__titleStyle}>
        Question {props.questionNumber}
      </Text>
      <Text style={styles.questionWrap__subTitleStyle}>
        {props.question.trim()}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  questionWrap: {},
  questionWrap__titleStyle: {
    color: Colors.textheighlighted,
    fontSize: 16,
    fontFamily: Fonts.regular,
    marginBottom: 16,
  },
  questionWrap__subTitleStyle: {
    color: Colors.textcolor,
    fontSize: 22,
    fontFamily: Fonts.semiBold,
    marginBottom: 35,
  },
});

export { CardQuestions };
