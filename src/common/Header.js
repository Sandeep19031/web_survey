import React from "react";
import {
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Fonts, Colors } from "../utils/";

const Header = (props) => {
  return (
    <>
      <SafeAreaView
        style={
          props.safeAreaBackground && {
            backgroundColor: props.safeAreaBackground,
          }
        }
      ></SafeAreaView>
      <View style={[styles.headerStyle, props.style]} onPress={props.onPress}>
        {props.leftIcon ? (
          <TouchableOpacity
            style={styles.header_left}
            onPress={props.onPressLeftLink}
            activeOpacity={0.6}
          >
            <Image source={props.iconLeft} />
          </TouchableOpacity>
        ) : (
          <View style={styles.header_Right}></View>
        )}
        <View style={styles.headerText}>
          <Text
            style={[
              styles.titleTextStyle,
              props.titleColor && { color: props.titleColor },
            ]}
            lineBreakMode="tail"
            numberOfLines={1}
          >
            {props.title}
          </Text>
        </View>
        {props.rightIcon ? (
          <TouchableOpacity
            style={styles.header_Right}
            onPress={props.onPressRightLink}
            activeOpacity={0.6}
          >
            {props.rightIconImg && <Image source={props.rightIcon} />}
            {props.rightTitle && (
              <Text style={styles.titleTextStyle}>{props.rightTitle}</Text>
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.header_Right}></View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    height: 44,
    backgroundColor: Colors.headerBgLight,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  header_left: {
    width: 44,
    height: 44,
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
    alignItems: "center",
  },
  titleTextStyle: {
    fontFamily: Fonts.medium,
    fontSize: 16,
    color: Colors.black,
  },
  rightTextStyle: {
    fontFamily: Fonts.regular,
    fontSize: 12,
    color: Colors.black,
  },
  header_Right: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export { Header };
