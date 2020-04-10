import React from "react";
import { View, Text, Alert } from "react-native";
import styles from "./styles";

import { useSelector, useDispatch } from "react-redux";
import { doctorSelector, tokenSelector, sessionsSelector } from "../../redux/selectors";
import { ScreenContainer, Avatar, Touchable, Button } from "../../components";
import SessionPicker, { onHourPressFunction } from "../../components/SessionPicker";
import { setSearchedDoctorSessionsAction } from "../../redux/actions/sessionsActions";
import { getDoctorSessions } from "../../api/sessions";
import { Colors, isWeb } from "../../utils/values";
import { addDays, addMinutes } from "../../utils/zdate";

import { IDoctor } from "../../../../../@types";
import { useUnifiedNavigation } from "../../navigation/useUnifiedNavigation";
import { useAlert } from "../../components/Alert";
import CalendarContainer from "../../components/CalendarContainer";
import { ZTime } from "../../utils/ztime";
import { mergeDateRanges } from "../../components/SessionPicker/helpers";

const DoctorAvailablities: React.FC = () => {
  const dispatch = useDispatch();
  const doctor = useSelector(doctorSelector);
  const accessToken = useSelector(tokenSelector);
  const sessions = useSelector(sessionsSelector);
  const [currentDay, setCurrentDay] = React.useState<Date>(new Date());
  const [editedUnavailibities, setEditedUnavailibities] = React.useState<IDoctor["unavailablities"]>(
    JSON.parse(JSON.stringify(doctor.unavailablities))
  );
  const { navigate } = useUnifiedNavigation();
  const alert = useAlert();
  React.useEffect(() => {
    fetchSessions();
  }, []);

  function fetchSessions() {
    getDoctorSessions(accessToken, doctor._id)
      .then((sessions) => {
        dispatch(setSearchedDoctorSessionsAction(sessions));
      })
      .catch((error) => {
        alert("Oops!", error.message);
      });
  }

  const handleHourPress: onHourPressFunction = (time: ZTime) => {
    let newEditedUnavailibities = [...editedUnavailibities];
    newEditedUnavailibities.push({
      from: time.date.toISOString(),
      to: addMinutes(time.date, 29).toISOString(),
    });
    setEditedUnavailibities(mergeDateRanges(newEditedUnavailibities, doctor.sessionDurations));
  };

  function handleRightPress() {
    setCurrentDay(addDays(currentDay, 3));
  }
  function handleLeftPress() {
    setCurrentDay(addDays(currentDay, -3));
  }

  const unavailablitiesConcat = doctor.unavailablities.concat(editedUnavailibities);

  return (
    <ScreenContainer
      status={{ backgroundColor: Colors.white, barStyle: "dark-content" }}
      safeArea={{ style: { backgroundColor: Colors.white, paddingHorizontal: 0 } }}
    >
      <View style={{ flex: 1, paddingHorizontal: isWeb ? "5%" : 0 }}>
        <View style={styles.header}>
          <Text style={styles.calendarTitle}>Disponibilités</Text>
          <Touchable
            borderRadius={30}
            onPress={() => {
              if (isWeb) {
                navigate("/doctor/profile");
              } else {
                navigate("DoctorProfile");
              }
            }}
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Avatar radius={35} style={{ margin: 5 }} />
          </Touchable>
        </View>

        <CalendarContainer>
          <SessionPicker
            filterMode="both"
            currentDate={currentDay}
            allreadyTakenHours={sessions}
            unavailablitites={unavailablitiesConcat}
            workingHours={doctor.workingHours}
            sessionDurations={doctor.sessionDurations}
            onHourPress={handleHourPress}
            onArrowLeftPress={handleLeftPress}
            onArrowRightPress={handleRightPress}
            onRefresh={fetchSessions}
          />
        </CalendarContainer>
      </View>
      <View style={{ flexDirection: "row-reverse", paddingHorizontal: isWeb ? "5%" : 0, paddingVertical: 20 }}>
        <Button style={{ marginHorizontal: 20, width: 100 }} text="Définir" onPress={() => {}} />
      </View>
    </ScreenContainer>
  );
};

export default DoctorAvailablities;
