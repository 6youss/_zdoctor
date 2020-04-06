import React from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { ZTime } from "../../utils/ztime";
import styles, { dayColStyles } from "./styles";

import DayColumn from "./DayColumn";
import { Colors, isWeb } from "../../utils/values";
import {
  getDayName,
  getMonthName,
  getDateFromString,
  getStringFromDate,
  dateRange,
  isDateInRange,
} from "../../utils/zdate";
import Arrow from "./Arrow";

import Touchable from "../Touchable";
import { IDoctor } from "../../../../../@types";

export type Hours = Array<{ id: string; time: string } | string>;

export interface Sessions {
  [date: string]: Hours;
}

export type ZHours = Array<ZTime>;

export interface ZSessions {
  [date: string]: ZHours;
}

export type onHourPressFunction = (dayTime: Date, hour: ZTime) => void;
export type onDayPressFunction = (day: Date) => void;
export type dayCounts = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export interface SessionPickerProps {
  filterMode: "taken" | "available" | "both";
  currentDate?: Date;
  dayCount?: dayCounts;
  defaultStartingHour?: ZTime;
  defaultEndingHour?: ZTime;
  defaultSessionDuration?: number;
  workingHours?: IDoctor["workingHours"];
  sessionDurations?: IDoctor["sessionDurations"];
  unavailablitites?: IDoctor["unavailablities"];
  allreadyTakenHours?: Sessions;
  onHourPress?: onHourPressFunction;
  onDayPress?: onDayPressFunction;
  onRefresh?: () => void;
  onArrowRightPress?: (currentDate: Date) => void;
  onArrowLeftPress?: (currentDate: Date) => void;
}

const SessionPicker: React.FC<SessionPickerProps> = ({
  filterMode,
  currentDate = new Date(),
  dayCount,
  defaultStartingHour = ZTime.fromString("08:00"),
  defaultEndingHour = ZTime.fromString("17:00"),
  defaultSessionDuration = 30,
  workingHours = [],
  unavailablitites = [],
  sessionDurations = [],
  allreadyTakenHours = {},
  onHourPress = () => {},
  onDayPress = () => {},
  onRefresh = () => {},
  onArrowRightPress = () => {},
  onArrowLeftPress = () => {},
}) => {
  if (!dayCount) {
    let defaultDayCount: dayCounts = isWeb ? 7 : 3;
    dayCount = defaultDayCount;
  }
  const dayColumnWidth = 80 / dayCount;
  const shownDatesRange = dateRange(currentDate, dayCount - 1);
  let filteredHours: ZSessions = {};

  //allredyTakenHours formated to use ZTime type
  let __allredyTakenHours: ZSessions = {};
  for (let date of shownDatesRange) {
    const dateStr = getStringFromDate(date, false);
    __allredyTakenHours[dateStr] = [];
    if (allreadyTakenHours[dateStr]) {
      __allredyTakenHours[dateStr] = allreadyTakenHours[dateStr].map((hour) => {
        if (typeof hour === "string") {
          return ZTime.fromString(hour);
        } else {
          return ZTime.fromString(hour.time, hour.id);
        }
      });
    }
    filteredHours[dateStr] = filterHours(dateStr);
  }

  function getWorkHours(date: Date): { startingHour: ZTime; endingHour: ZTime } {
    let range = {
      startingHour: defaultStartingHour,
      endingHour: defaultEndingHour,
    };
    for (let wh of workingHours) {
      if (isDateInRange(date, wh.from, wh.to)) {
        range.startingHour = ZTime.fromMinutes(wh.opensAt);
        range.endingHour = ZTime.fromMinutes(wh.closesAt);
      }
    }
    return range;
  }

  function getSessionDuration(date: Date): number {
    let sessionDuration = defaultSessionDuration;
    for (let sd of sessionDurations) {
      if (isDateInRange(date, sd.from, sd.to)) {
        sessionDuration = sd.duration;
      }
    }
    return sessionDuration;
  }

  function filterHours(sessionDateKey: string): Array<ZTime> {
    let allreadyTakenHours = __allredyTakenHours[sessionDateKey];
    const sessionDate = getDateFromString(sessionDateKey);

    let { startingHour, endingHour } = getWorkHours(sessionDate);

    let sessionDuration = getSessionDuration(sessionDate);
    let filteredHours: Array<ZTime> = [];

    let _hour = startingHour.copy();

    while (_hour.isLess(endingHour) && endingHour.toMinutes() - _hour.toMinutes() >= sessionDuration) {
      let isUnavailableHour = false;
      for (let unavailablity of unavailablitites) {
        const sessionDateWithTime = new Date(sessionDate.setHours(_hour.hours, _hour.minutes, 0, 0));
        if (isDateInRange(sessionDateWithTime, unavailablity.from, unavailablity.to, false)) {
          isUnavailableHour = true;
          break;
        }
      }
      if (isUnavailableHour) {
        _hour.unavailable = true;
      }

      const takenHour = allreadyTakenHours.find((hour) => hour.equals(_hour));
      if (takenHour) {
        _hour.id = takenHour.id;
      }

      switch (filterMode) {
        case "available": {
          if (!_hour.unavailable && !_hour.id) {
            console.log(_hour);
            filteredHours.push(_hour);
          }
          break;
        }
        case "taken": {
          if (_hour.id) filteredHours.push(_hour);
          break;
        }
        case "both":
        default:
          filteredHours.push(_hour);
          break;
      }

      _hour = _hour.addDuration(sessionDuration);
    }
    return filteredHours;
  }

  const DaysHeader: React.FC = () => {
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
          const date = getDateFromString(dateKey);
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
              <Text style={dayColStyles.day}>{getDayName(date)}</Text>
              <Text
                style={[dayColStyles.month, emptyDay && { color: Colors.darkGray }]}
              >{`${date.getDate()} ${getMonthName(date)}`}</Text>
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

  return (
    <View style={styles.container}>
      <DaysHeader />
      <ScrollView
        style={[{ flexGrow: 1 }, isWeb && { height: 1 }]}
        refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
        contentContainerStyle={styles.hoursContainer}
      >
        {Object.keys(filteredHours).map((date) => {
          // console.log(filteredHours[date]);
          return (
            <DayColumn
              filterMode={filterMode}
              width={dayColumnWidth}
              key={"day-" + date}
              day={date}
              hours={filteredHours[date]}
              onHourPress={onHourPress}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
export default SessionPicker;
