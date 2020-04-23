import React from "react";
import { Text, TextProps } from "react-native";
import styles from "./styles";
import { Colors } from "../../utils/globalStyles";

interface TitleProps extends TextProps {
  light?: boolean;
}

const Title: React.FC<TitleProps> = ({ light, children, style, ...props }) => {
  return (
    <Text style={[styles.defaultTitleStyles, light && { color: Colors.white }, style]} {...props}>
      {children}
    </Text>
  );
};

export default Title;
