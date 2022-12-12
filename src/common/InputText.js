import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Fonts, Colors } from "../utils/";

const InputText = (props) => {
  return (
    <View style={[styles.inputwrapstyle, props.style]}>
      {props.label && (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.labelStyle}>{props.label}</Text>
          <TouchableOpacity onPress={props.onPressRight}>
            <Text style={styles.rightLabelStyle}>{props.rightLabelText}</Text>
          </TouchableOpacity>
        </View>
      )}
      <TextInput
        defaultValue={props.defaultValue}
        pointerEvents={props.pointerEvents}
        keyboardType={props.keyboardType}
        placeholderTextColor={Colors.inputplaceholder}
        placeholder={props.placeholder}
        style={[styles.inputmainstyle, props.inputstyle]}
        maxLength={props.maxLength}
        onChangeText={props.onChangeText}
        autoCapitalize={props.autoCapitalize}
        multiline={props.multiline}
        value={props.value}
        editable={props.editable}
        multiline={props.multiline}
        textAlignVertical={props.textAlignVertical}
        onBlur={props.onBlur}
        secureTextEntry={props.secureTextEntry}
      />
      <View>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputwrapstyle: {
    alignSelf: "stretch",
    marginBottom: 16,
  },
  labelStyle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.textlight,
    marginBottom: 8,
  },
  rightLabelStyle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.themeColor,
    textDecorationLine: "underline",
    marginBottom: 8,
  },
  inputmainstyle: {
    height: 56,
    borderRadius: 28,
    fontFamily: Fonts.regular,
    fontSize: 12,
    backgroundColor: Colors.inputbg,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    paddingHorizontal: 20,
  },
});

export { InputText };
