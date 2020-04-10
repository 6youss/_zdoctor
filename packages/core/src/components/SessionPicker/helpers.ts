import { IDoctor } from "../../../../../@types";
import { isDateInRange } from "../../utils/zdate";
import { ZTime } from "../../utils/ztime";
import {
  ZSessionsMap,
  SessionPickerProps,
  DEFAULT_SESSION_DURATION,
  DEFAULT_STARTING_HOUR,
  DEFAULT_ENDING_HOUR,
} from ".";
type IWorkHours = { startingHour: number; endingHour: number };

export function getWorkHours(
  workingHours: IDoctor["workingHours"],
  date: Date,
  defaultStartingHour: number = DEFAULT_STARTING_HOUR,
  defaultEndingHour: number = DEFAULT_ENDING_HOUR
): IWorkHours {
  let range = {
    startingHour: defaultStartingHour,
    endingHour: defaultEndingHour,
  };
  for (let wh of workingHours) {
    if (isDateInRange(date, wh.from, wh.to)) {
      range.startingHour = wh.opensAt;
      range.endingHour = wh.closesAt;
    }
  }
  return range;
}

export function getSessionDuration(
  sessionDurations: IDoctor["sessionDurations"],
  date: Date,
  defaultSessionDuration: number = DEFAULT_SESSION_DURATION
): number {
  let sessionDuration = defaultSessionDuration;
  for (let sd of sessionDurations) {
    if (isDateInRange(date, sd.from, sd.to)) {
      sessionDuration = sd.duration;
    }
  }
  return sessionDuration;
}

export function filterHours(
  sessionDateKey: string,
  __allredyTakenHours: ZSessionsMap,
  workingHours: IDoctor["workingHours"],
  sessionDurations: IDoctor["sessionDurations"],
  unavailablitites: IDoctor["unavailablities"],
  filterMode: SessionPickerProps["filterMode"],
  defaultStartingHour: SessionPickerProps["defaultStartingHour"],
  defaultEndingHour: SessionPickerProps["defaultEndingHour"],
  defaultSessionDuration: SessionPickerProps["defaultSessionDuration"]
): Array<ZTime> {
  let dateAllreadyTakenHours = __allredyTakenHours[sessionDateKey];

  const sessionDate = new Date(sessionDateKey);
  let { startingHour, endingHour } = getWorkHours(workingHours, sessionDate, defaultStartingHour, defaultEndingHour);
  let sessionDuration = getSessionDuration(sessionDurations, sessionDate, defaultSessionDuration);
  let filteredHours: Array<ZTime> = [];
  let _hour: ZTime = new ZTime(new Date(sessionDate.setUTCHours(startingHour / 60, startingHour % 60)).toISOString());

  while (_hour.toMinutes() < endingHour && endingHour - _hour.toMinutes() >= sessionDuration) {
    let isUnavailableHour = false;
    for (let unavailablity of unavailablitites) {
      const sessionDateWithTime = new Date(sessionDate.setUTCHours(_hour.hours, _hour.minutes, 0, 0));
      if (isDateInRange(sessionDateWithTime, unavailablity.from, unavailablity.to, false)) {
        isUnavailableHour = true;
        break;
      }
    }
    if (isUnavailableHour) {
      _hour.unavailable = true;
    }

    const takenHour = dateAllreadyTakenHours.find((hour) => hour.equals(_hour));

    if (takenHour) {
      _hour.id = takenHour.id;
    }

    switch (filterMode) {
      case "available": {
        if (!_hour.unavailable && !_hour.id) {
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
