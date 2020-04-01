import React from "react";
import { StyleSheet } from "react-native";
import { Touchable } from "..";
import { Colors } from "../../utils/values";
import { MaterialIcons } from "../../libs/vector-icons";

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
      <MaterialIcons
        style={{
          fontSize: 14,
          color: Colors.darkGray
        }}
        name={left ? "arrow-back" : "arrow-forward"}
      />
    </Touchable>
  );
};

export default Arrow;
