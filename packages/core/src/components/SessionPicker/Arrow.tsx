import React from "react";
import { StyleSheet } from "react-native";
import { Touchable } from "..";
import { Colors } from "../../utils/values";
import Icon from "../Icon";
const arrowStyles = StyleSheet.create({
  touch: {
    height: "100%",
    width: "10%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
const Arrow: React.FC<{ left?: boolean; onPress: () => void }> = ({ left, onPress }) => {
  return (
    <Touchable borderRadius={0} onPress={onPress} style={arrowStyles.touch}>
      <Icon
        style={{
          fontSize: 14,
          color: Colors.darkGray
        }}
        name={left ? "arrow-left" : "arrow-right"}
      />
    </Touchable>
  );
};

export default Arrow;
