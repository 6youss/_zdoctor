import React from "react";
import { TextInput, TextInputProps, Text } from "react-native";
import styles from "./styles";
import { Colors } from "../../utils/globalStyles";

interface InputProps {
  error?: string;
}

const Input: React.FC<InputProps & TextInputProps> = ({ error, style, ...props }) => {
  return (
    <>
      <TextInput
        style={[styles.defaultInputStyles, style]}
        placeholderTextColor={Colors.whiteTransparent}
        selectionColor={Colors.primaryDark}
        {...props}
      />
      <Text style={[styles.defaultErrorStyle]}>{error}</Text>
    </>
  );
};

export default Input;
