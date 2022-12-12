import React from "react";
import { TouchableOpacity, Image, View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-web-linear-gradient";
import { Fonts, Images, Colors } from "../utils";

const CardExploreCheckboxBorderLess = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={props.onPress}
      style={[styles.buttonStyle, props.style]}
    >
      {/* <LinearGradient
        style={[styles.buttonStyle, props.style]}
        colors={['rgba(67, 222, 203, 0.20)', 'rgba(9, 178, 226, 0.20)']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>       */}
      <Image
        source={
          props.isChecked ? Images.checkbox_selected : Images.check_box_outline
        }
      />
      <Text style={styles.buttonTitleStyle}>{props.title.trim()}</Text>
      {/* </LinearGradient> */}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    // minHeight: 40,
    // borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 8,
  },
  buttonTitleStyle: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.textcolor,
    marginLeft: 25,
    marginRight: 8,
    flex: 1,
  },
});

export { CardExploreCheckboxBorderLess };
