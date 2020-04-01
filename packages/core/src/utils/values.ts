import { Platform } from "react-native";

export const isWeb = Platform.OS === "web";
export const isAndroid = Platform.OS === "android";
export const isiOs = Platform.OS === "ios";
export const isNative = isiOs || isAndroid;

export const Colors = {
  primary: "#81B3FA",
  primaryDark: "#0049A7",
  primaryLight: "#BEDFFF",
  secondary: "#FEA200",
  gray: "#DDD",
  lightGray: "#EEF2F6",
  darkGray: "#999",
  white: "#FFF",
  whiteTransparent: "#FFFC",
  black: "#000"
};

export const bigShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 10
  },
  shadowOpacity: 0.25,
  shadowRadius: 13.16,
  elevation: 50
};

export const mediumShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 5
  },
  shadowOpacity: 0.2,
  shadowRadius: 5,
  elevation: 13
};

export const smallShadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2
};

export const BASE_URL = __DEV__
  ? "http://192.168.0.30:8000/api"
  : // ?  'https://zedoctolib.herokuapp.com/api/'
    "https://zedoctolib.herokuapp.com/api/";
