import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../utils/values";
import { getDayName, getMonthName } from "../../utils/zdate";
import Arrow from "./Arrow";
import Touchable from "../Touchable";
import { SessionPickerProps, ZSessionsMap, DEFAULT_CURRENT_DAY } from ".";

export interface DaysHeaderProps {
  filteredHours: ZSessionsMap;
  dayColumnWidth: number;
  onArrowLeftPress: SessionPickerProps["onArrowLeftPress"];
  onArrowRightPress: SessionPickerProps["onArrowRightPress"];
  currentDate: SessionPickerProps["currentDate"];
  onDayPress: SessionPickerProps["onDayPress"];
}
const styles = StyleSheet.create({
  day: {
    color: Colors.darkGray,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  month: {
    color: Colors.secondary,
    textAlign: "center",
    fontSize: 17,
  },
});

const DaysHeader: React.FC<DaysHeaderProps> = ({
  filteredHours,
  dayColumnWidth,
  currentDate = DEFAULT_CURRENT_DAY,
  onArrowLeftPress = () => {},
  onArrowRightPress = () => {},
  onDayPress = () => {},
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 60,
        alignItems: "center",
        backgroundColor: Colors.white,
      }}
    >
      <Arrow
        onPress={() => {
          onArrowLeftPress(currentDate);
        }}
        left
      />
      {Object.keys(filteredHours).map((dateKey) => {
        const date = new Date(dateKey);
        const emptyDay = filteredHours[dateKey].length === 0;
        return (
          <Touchable
            onPress={() => {
              onDayPress(date);
            }}
            key={dateKey}
            style={{
              width: `${dayColumnWidth}%`,
              opacity: emptyDay ? 0.5 : 1,
            }}
          >
            <Text style={styles.day}>{getDayName(date)}</Text>
            <Text style={[styles.month, emptyDay && { color: Colors.darkGray }]}>{`${date.getDate()} ${getMonthName(
              date
            )}`}</Text>
          </Touchable>
        );
      })}
      <Arrow
        onPress={() => {
          onArrowRightPress(currentDate);
        }}
      />
    </View>
  );
};

export default DaysHeader;
