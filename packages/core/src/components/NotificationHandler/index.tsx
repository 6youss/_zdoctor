import React from "react";
import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { useSelector, useDispatch } from "react-redux";
import { tokenSelector, doctorSelector } from "../../redux/selectors";
import { postDevice } from "../../api/user";
import { Platform } from "react-native";
import { getDoctorSessions } from "../../api/sessions";
import { searchedDoctorSessionsAction } from "../../redux/actions/sessionsActions";
import { NOTIFICATION_TYPES } from "./types";
const NotificationHandler: React.FC = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(tokenSelector);
  const doctor = useSelector(doctorSelector);

  React.useEffect(() => {
    let unsubscribe: () => void = messaging().onMessage(notificationHandler);

    async function setupNotifications() {
      const granted = await requestPermission();
      if (granted) {
        await registerAppWithFCM();
        const fcmToken = await messaging().getToken();
        await postDevice(accessToken, fcmToken, Platform.OS);
        //console.log({fcmToken});
      }
    }
    setupNotifications();

    return unsubscribe;
  }, []);

  const notificationHandler = React.useCallback(
    async function (message: FirebaseMessagingTypes.RemoteMessage) {
      if (message.data && message.data.type === NOTIFICATION_TYPES.NEW_DOCTOR_SESSION) {
        dispatch(searchedDoctorSessionsAction(await getDoctorSessions(accessToken, doctor._id)));
      }
    },
    [doctor]
  );

  async function requestPermission(): Promise<boolean> {
    const granted = await messaging().requestPermission();
    if (granted) {
      //console.log("User granted messaging permissions!");
    } else {
      //console.log("User declined messaging permissions :(");
    }
    return granted;
  }

  //@IMPORTANT calling this function is needed for ios
  async function registerAppWithFCM() {
    await messaging().registerForRemoteNotifications();
  }

  return null;
};

export default NotificationHandler;
