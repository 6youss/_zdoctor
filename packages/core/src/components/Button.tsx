import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Colors } from "../utils/globalStyles";
import Touchable from "./Touchable";
import Loader from "./Loader";

interface ButtonProps {
  onPress: () => void;
  light?: boolean;
  color?: ViewStyle["backgroundColor"];
  text: string;
  loading?: boolean;
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({ onPress, light, text, loading = false, style, color }) => {
  return (
    <Touchable
      shadow
      onPress={!loading ? onPress : () => {}}
      borderRadius={20}
      style={[
        styles.button,
        light && { backgroundColor: Colors.white },
        style,
        color !== undefined && { backgroundColor: color },
      ]}
    >
      {loading ? (
        <Loader color={light ? Colors.primary : Colors.white} />
      ) : (
        <Text style={[styles.buttonText, light && { color: Colors.primary }]}>{text}</Text>
      )}
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    padding: 8,
    paddingHorizontal: 20,
    minHeight: 40,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 15,
  },
});
export default Button;
