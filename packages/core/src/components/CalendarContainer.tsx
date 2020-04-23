import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors, bigShadow } from "../utils/globalStyles";

const styles = StyleSheet.create({
  sessionPickerContainer: {
    flexGrow: 1,
    overflow: "hidden",
    borderRadius: 20,
  },
});

const CalendarContainer: React.FC = ({ children }) => {
  return (
    <View
      style={{
        flexGrow: 1,
        marginHorizontal: 20,
        ...bigShadow,
        overflow: "hidden",
        borderRadius: 20,
        // borderTopLeftRadius: 20,
      }}
    >
      <View style={[styles.sessionPickerContainer, { elevation: bigShadow.elevation }]}>{children}</View>
    </View>
  );
};
export default CalendarContainer;
