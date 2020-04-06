import React from "react";
import { View, Text } from "react-native";
import { ZSessions, onHourPressFunction, SessionPickerProps } from ".";
import { dayColStyles } from "./styles";
import Touchable from "../Touchable";

interface DayColumnProps {
  filterMode: SessionPickerProps["filterMode"];
  day: string;
  hours: ZSessions;
  width: number;
  onHourPress?: onHourPressFunction;
}

const DayColumn: React.FC<DayColumnProps> = ({ hours, width, onHourPress = () => {} }) => {
  return (
    <View style={[dayColStyles.container, { width: `${width}%` }]}>
      {hours.map((hour, index) => {
        const isHourTaken = hour.id !== undefined;

        return (
          <Touchable
            shadow={!hour.unavailable}
            onPress={() => {
              onHourPress(hour);
            }}
            key={`hour-${hour.unavailable ?? "unv"}${index}`}
            style={[
              { width: "90%", height: 70, marginVertical: 5 },
              dayColStyles.hour,
              isHourTaken && dayColStyles.takenHour,
              hour.unavailable && { opacity: 0.3 },
            ]}
            borderRadius={8}
          >
            <Text style={[dayColStyles.hourText, isHourTaken && dayColStyles.takenHourText]}>{hour.timeString()}</Text>
            {/* {hour.id && <View style={dayColStyles.dot} />} */}
          </Touchable>
        );
      })}
    </View>
  );
};

export default DayColumn;
