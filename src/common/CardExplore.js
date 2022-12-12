import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-web-linear-gradient";
import { Fonts, Images, Colors } from "../utils/";

const CardExplore = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <LinearGradient
        style={[styles.buttonStyle, props.style]}
        colors={["rgba(67, 222, 203, 0.20)", "rgba(9, 178, 226, 0.20)"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <Image
          source={
            props.isChecked ? Images.radio_selected : Images.radio_default
          }
        />
        <Text style={styles.buttonTitleStyle}>{props.title.trim()}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    minHeight: 60,
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 10,
    marginBottom: 16,
  },
  buttonTitleStyle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textcolor,
    marginLeft: 25,
  },
});

export { CardExplore };
