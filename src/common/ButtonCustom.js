import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-web-linear-gradient";
import { Fonts, Colors } from "../utils/";

const ButtonCustom = (props) => {
  // console.log("Button title-----", props.title);
  return (
    <LinearGradient
      style={[{ borderRadius: 28 }, props.styleLinear]}
      colors={
        props.disabled
          ? [Colors.headerBgLight, "gray"]
          : props.back
          ? ["#D3D3D3", "gray"]
          : ["#62F6BE", "#00ABE6"]
      }
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <TouchableOpacity
        style={[styles.buttonStyle, props.style]}
        onPress={props.onPress}
        disabled={props.disabled}
        activeOpacity={0.6}
      >
        <Text style={[styles.buttonTitleStyle, props.textStyle]}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitleStyle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.white,
  },
});

export { ButtonCustom };
