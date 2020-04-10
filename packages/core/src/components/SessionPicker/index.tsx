import React from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { ZTime } from "../../utils/ztime";
import styles from "./styles";
import DayColumn from "./DayColumn";
import { isWeb } from "../../utils/values";
import { makeDateRange } from "../../utils/zdate";
import { IDoctor, ISession } from "../../../../../@types";
import { filterHours } from "./helpers";
import DaysHeader from "./DaysHeader";

export type Hours = Array<{ id: string; time: string } | string>;

export type Sessions = Array<ISession>;

export type ZSessions = Array<ZTime>;
export interface ZSessionsMap {
  [date: string]: ZSessions;
}

export type dayCounts = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type onHourPressFunction = (hour: ZTime) => void;
export type onDayPressFunction = (day: Date) => void;
export const DEFAULT_SESSION_DURATION = 30;
export const DEFAULT_STARTING_HOUR = ZTime.timeStringToMinutes("08:00");
export const DEFAULT_ENDING_HOUR = ZTime.timeStringToMinutes("17:00");
export const DEFAULT_CURRENT_DAY = new Date();

export interface SessionPickerProps {
  filterMode: "taken" | "available" | "both";
  currentDate?: Date;
  dayCount?: dayCounts;
  defaultStartingHour?: number;
  defaultEndingHour?: number;
  defaultSessionDuration?: number;
  workingHours: IDoctor["workingHours"];
  sessionDurations: IDoctor["sessionDurations"];
  unavailablitites: IDoctor["unavailablities"];
  allreadyTakenHours: Sessions;
  onHourPress?: onHourPressFunction;
  onDayPress?: onDayPressFunction;
  onRefresh?: () => void;
  onArrowRightPress?: (currentDate: Date) => void;
  onArrowLeftPress?: (currentDate: Date) => void;
}

const SessionPicker: React.FC<SessionPickerProps> = ({
  filterMode,
  currentDate = DEFAULT_CURRENT_DAY,
  dayCount = isWeb ? 7 : 3,
  defaultStartingHour = DEFAULT_STARTING_HOUR,
  defaultEndingHour = DEFAULT_ENDING_HOUR,
  defaultSessionDuration = DEFAULT_SESSION_DURATION,
  workingHours = [],
  unavailablitites = [],
  sessionDurations = [],
  allreadyTakenHours = [],
  onHourPress,
  onDayPress,
  onRefresh = () => {},
  onArrowRightPress,
  onArrowLeftPress,
}) => {
  const dayColumnWidth = 80 / dayCount;
  const shownDatesRange = makeDateRange(currentDate, dayCount - 1);

  let filteredHours: ZSessionsMap = {};
  let __allredyTakenHours: ZSessionsMap = {};

  for (let shownDate of shownDatesRange) {
    let [dateKey] = shownDate.toISOString().split("T");
    __allredyTakenHours[dateKey] = allreadyTakenHours
      .filter((session) => dateKey === session.date.split("T")[0])
      .map((session) => new ZTime(session.date, session._id));

    filteredHours[dateKey] = filterHours(
      dateKey,
      __allredyTakenHours,
      workingHours,
      sessionDurations,
      unavailablitites,
      filterMode,
      defaultStartingHour,
      defaultEndingHour,
      defaultSessionDuration
    );
  }

  return (
    <View style={styles.container}>
      <DaysHeader
        filteredHours={filteredHours}
        currentDate={currentDate}
        dayColumnWidth={dayColumnWidth}
        onArrowLeftPress={onArrowLeftPress}
        onArrowRightPress={onArrowRightPress}
        onDayPress={onDayPress}
      />
      <ScrollView
        style={[{ flexGrow: 1 }, isWeb && { height: 1 }]}
        refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
        contentContainerStyle={styles.hoursContainer}
      >
        {Object.keys(filteredHours).map((date) => {
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
