import React from "react";
import { StyleSheet, View } from "react-native";
import Touchable from "./Touchable";
import { Colors } from "../utils/values";
import { MaterialIcons } from "../libs/vector-icons";

const GoBack: React.FC<{ color?: string; onPress: () => void }> = ({ children, onPress, color = Colors.primary }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Touchable onPress={onPress} borderRadius={20} style={styles.goBack}>
        <MaterialIcons style={[styles.goBackTxt, { color }]} name="keyboard-arrow-left" />
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
    alignContent: "center",
  },
  goBackTxt: {
    fontSize: 25,
    color: Colors.primary,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});
