import React, { useState } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Fonts, Colors, Images } from "../utils/";
import LinearGradient from "react-native-web-linear-gradient";
import SelectDropdown from "react-native-select-dropdown";
import {
  CardExploreBorderLess,
  CardExploreCheckboxBorderLess,
} from "../common";
import constant from "./constant";
const SelectOption = (props) => {
  let dropdown = undefined;

  return (
    <SelectDropdown
      ref={(ref) => (dropdown = ref)}
      dropdownStyle={{ borderRadius: 8, paddingVertical: 16 }}
      renderCustomizedButtonChild={() => (
        <LinearGradient
          style={[styles.selectOptionStyle, props.style]}
          colors={["rgba(67, 222, 203, 0.20)", "rgba(9, 178, 226, 0.20)"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <Text
            style={styles.selectedOptionStyle}
            lineBreakMode={"tail"}
            numberOfLines={1}
          >
            {props.value == "" ? "Select Option ... " : props.value.trim()}
          </Text>
          <Image source={Images.select_arrow} />
        </LinearGradient>
      )}
      buttonStyle={{
        width: Dimensions.get("window").width - 32,
        paddingHorizontal: -16,
        backgroundColor: "transparent",
        height: 60,
        marginBottom: 20,
      }}
      // defaultButtonText={}
      data={props.items}
      rowStyle={{
        flexWrap: "wrap",
        justifyContent: "center",
        borderBottomWidth: 0,
        height: undefined,
      }}
      renderCustomizedRowChild={(answer, indexAnswer) => {
        console.log("--------answer.type------------", answer);
        return answer.type.toLowerCase() == constant.single ? (
          <CardExploreBorderLess
            title={answer.answer}
            style={{ marginBottom: 0 }}
            isChecked={answer.selected}
            onPress={() => {
              console.log("OnPress 38");
              props.onPress(indexAnswer);
              dropdown.closeDropdown();
            }}
          />
        ) : (
          <CardExploreCheckboxBorderLess
            title={answer.answer}
            isChecked={answer.selected}
            onPress={() => {
              console.log("OnPress 47");
              props.onPressCheckBox(indexAnswer);
            }}
          />
        );
      }}
      onSelect={(selectedItem, index) => {
        // console.log(selectedItem, index)
        // global.userData.gender = selectedItem
        // let params = {
        //     gender: selectedItem
        // }
        // this.editProfile(params)
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item;
      }}
    />
  );
};

const styles = StyleSheet.create({
  selectOptionStyle: {
    height: 60,
    borderRadius: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  selectedOptionStyle: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.textcolor,
    width: "90%",
  },
});

export { SelectOption };
