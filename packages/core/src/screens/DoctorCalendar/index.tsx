import React from "react";
import { View, Text, Alert } from "react-native";
import styles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { doctorSelector, tokenSelector, sessionsSelector } from "../../redux/selectors";
import { ScreenContainer, Avatar, Touchable } from "../../components";
import SessionPicker, { onHourPressFunction } from "../../components/SessionPicker";
import { setSearchedDoctorSessionsAction } from "../../redux/actions/sessionsActions";
import { getDoctorSessions } from "../../api/sessions";
import { Colors, bigShadow, isWeb } from "../../utils/values";
import { addDays } from "../../utils/zdate";
import { useUnifiedNavigation } from "../../navigation/useUnifiedNavigation";
import { useAlert } from "../../components/Alert";
import CalendarContainer from "../../components/CalendarContainer";

const DoctorCalendar: React.FC = () => {
  const dispatch = useDispatch();
  const doctor = useSelector(doctorSelector);
  const accessToken = useSelector(tokenSelector);
  const sessions = useSelector(sessionsSelector);
  const [currentDay, setCurrentDay] = React.useState<Date>(new Date());
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

  const handleDayPress: onHourPressFunction = (time) => {
    if (time.id) {
      if (isWeb) {
        navigate("/doctor/session/:id", { id: time.id });
      } else {
        navigate("SessionDetail", { id: time.id });
      }
    } else {
      throw new Error("unexpected undefined session id");
    }
  };

  function handleRightPress() {
    setCurrentDay(addDays(currentDay, 3));
  }
  function handleLeftPress() {
    setCurrentDay(addDays(currentDay, -3));
  }

  return (
    <ScreenContainer
      status={{ backgroundColor: Colors.white, barStyle: "dark-content" }}
      safeArea={{ style: { backgroundColor: Colors.white } }}
    >
      <View style={styles.header}>
        <Text style={styles.calendarTitle}>Votre calendrier de visites</Text>
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
          filterMode="taken"
          currentDate={currentDay}
          allreadyTakenHours={sessions}
          workingHours={doctor.workingHours}
          unavailablitites={doctor.unavailablities}
          sessionDurations={doctor.sessionDurations}
          onHourPress={handleDayPress}
          onArrowLeftPress={handleLeftPress}
          onArrowRightPress={handleRightPress}
          onRefresh={fetchSessions}
        />
      </CalendarContainer>
    </ScreenContainer>
  );
};

export default DoctorCalendar;
