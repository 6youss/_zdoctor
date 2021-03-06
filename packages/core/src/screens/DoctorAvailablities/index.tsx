import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";

import { useSelector, useDispatch } from "react-redux";
import { doctorSelector, tokenSelector, sessionsSelector } from "../../redux/selectors";
import { ScreenContainer, Avatar, Touchable, Button, GoBack } from "../../components";
import SessionPicker, { onHourPressFunction, DEFAULT_SESSION_DURATION } from "../../components/SessionPicker";
import { searchedDoctorSessionsAction } from "../../redux/actions/sessionsActions";
import { getDoctorSessions } from "../../api/sessions";
import { isWeb } from "../../utils/values";
import { Colors } from "../../utils/globalStyles";
import { addDays, addMinutes, isDateInRange } from "../../utils/zdate";
import { IDoctor } from "../../../../../@types";
import { useUnifiedNavigation } from "../../navigation/useUnifiedNavigation";
import { useAlert } from "../../components/Alert";
import CalendarContainer from "../../components/CalendarContainer";
import { ZTime } from "../../utils/ztime";
import { mergeDateRanges, splitDateRanges, getSessionDuration } from "../../components/SessionPicker/helpers";
import { patchDoctor } from "../../api/doctor";
import { setDoctorAction } from "../../redux/actions/doctorActions";

const DoctorAvailablities: React.FC = () => {
  const { navigate, goBack } = useUnifiedNavigation();
  const alert = useAlert();
  const dispatch = useDispatch();
  const doctor = useSelector(doctorSelector);
  const accessToken = useSelector(tokenSelector);
  const sessions = useSelector(sessionsSelector);
  const [currentDay, setCurrentDay] = React.useState<Date>(new Date());
  const [editedUnavailibities, setEditedUnavailibities] = React.useState<IDoctor["unavailablities"]>(
    JSON.parse(JSON.stringify(doctor.unavailablities))
  );
  const [isSubmiting, setIsSubmiting] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetchSessions();
  }, []);

  function fetchSessions() {
    getDoctorSessions(accessToken, doctor._id)
      .then((sessions) => {
        dispatch(searchedDoctorSessionsAction(sessions));
      })
      .catch((error) => {
        alert("Oops!", error.message);
      });
  }

  const handleHourPress: onHourPressFunction = (time: ZTime) => {
    const duration = getSessionDuration(doctor.sessionDurations, time.date, DEFAULT_SESSION_DURATION);
    const pressedRange = {
      from: time.dateString,
      to: addMinutes(time.date, duration - 1).toISOString(),
    };
    // console.log(editedUnavailibities);
    let newEditedUnavailibities = [...editedUnavailibities];
    const allreadyUnvlbl = newEditedUnavailibities.findIndex((range) =>
      isDateInRange(time.date, new Date(range.from), new Date(range.to), false)
    );
    // console.log({ pressedRange, allreadyUnvlbl });
    if (allreadyUnvlbl > -1) {
      newEditedUnavailibities = splitDateRanges(newEditedUnavailibities, pressedRange);
    } else {
      newEditedUnavailibities.push(pressedRange);
    }
    setEditedUnavailibities(mergeDateRanges(newEditedUnavailibities, doctor.sessionDurations));
  };

  const handleDayPress = (date: Date) => {
    const pressedRange = {
      from: date.toISOString(),
      to: addMinutes(date, 23 * 60 + 59).toISOString(),
    };
    let newEditedUnavailibities = [...editedUnavailibities];

    const dayHasUnavailableHours = newEditedUnavailibities.findIndex(
      (range) => pressedRange.from <= range.from && pressedRange.to >= range.to
    );

    if (dayHasUnavailableHours > -1) {
      newEditedUnavailibities = splitDateRanges(newEditedUnavailibities, pressedRange);
    } else {
      newEditedUnavailibities.push(pressedRange);
    }

    setEditedUnavailibities(newEditedUnavailibities);
  };

  function handleRightPress() {
    setCurrentDay(addDays(currentDay, 3));
  }
  function handleLeftPress() {
    setCurrentDay(addDays(currentDay, -3));
  }

  function submit() {
    setIsSubmiting(true);
    patchDoctor(accessToken, doctor._id, {
      unavailablities: editedUnavailibities,
    })
      .then((doctor) => {
        dispatch(setDoctorAction(doctor));
        alert("Succès !", "vous avez  definies votre disponibilités");
        setIsSubmiting(false);
      })
      .catch((err) => {
        setIsSubmiting(false);
        alert("Erreur", err.message);
      });
  }

  return (
    <ScreenContainer
      status={{ backgroundColor: Colors.white, barStyle: "dark-content" }}
      safeArea={{ style: { backgroundColor: Colors.white, paddingHorizontal: 0 } }}
    >
      <View style={{ flex: 1, paddingHorizontal: isWeb ? "5%" : 0 }}>
        <View style={{ marginHorizontal: 20, marginTop: 15, marginBottom: 15 }}>
          <GoBack
            onPress={() => {
              goBack();
            }}
          >
            <Text style={styles.calendarTitle}>
              <Text style={{ fontWeight: "100" }}>{`Définir vos disponibilités`}</Text>
            </Text>
            <Touchable
              borderRadius={30}
              onPress={() => {
                navigate("/doctor/profile");
              }}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Avatar radius={35} style={{ margin: 5 }} />
            </Touchable>
          </GoBack>
        </View>

        <CalendarContainer>
          <SessionPicker
            filterMode="both"
            currentDate={currentDay}
            allreadyTakenHours={sessions}
            unavailablitites={editedUnavailibities}
            workingHours={doctor.workingHours}
            sessionDurations={doctor.sessionDurations}
            onHourPress={handleHourPress}
            onDayPress={handleDayPress}
            onArrowLeftPress={handleLeftPress}
            onArrowRightPress={handleRightPress}
            onRefresh={fetchSessions}
          />
        </CalendarContainer>
      </View>
      <View style={{ flexDirection: "row-reverse", paddingHorizontal: isWeb ? "5%" : 0, paddingVertical: 20 }}>
        <Button style={{ marginHorizontal: 20, width: 100 }} loading={isSubmiting} text="Confirmer" onPress={submit} />
      </View>
    </ScreenContainer>
  );
};

export default DoctorAvailablities;
