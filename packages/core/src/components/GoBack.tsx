import React from "react";
import { StyleSheet, View } from "react-native";
import { Touchable } from ".";
import { Colors } from "../utils/values";
import Icon from "./Icon";

const GoBack: React.FC<{ color?: string; onPress: () => void }> = ({ children, onPress, color = Colors.primary }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <Touchable shadow onPress={onPress} borderRadius={20} style={styles.goBack}>
        <Icon style={[styles.goBackTxt, { color }]} name="arrow-left" />
      </Touchable>
      {children}
    </View>
  );
};
export default GoBack;

const styles = StyleSheet.create({
  goBack: {
    width: 30,
    height: 30,
    padding: 5,
    justifyContent: "center",
    alignContent: "center"
  },
  goBackTxt: {
    fontSize: 17,
    color: Colors.primary,
    textAlign: "center"
  }
});
