import React from "react";
import firebase from "firebase/app";
import "firebase/messaging";
import firebaseConfig from "./firebaseConfig";
import { Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { tokenSelector, doctorSelector } from "../../redux/selectors";
import { postDevice } from "../../api/user";
import { searchedDoctorSessionsAction } from "../../redux/actions/sessionsActions";
import { getDoctorSessions } from "../../api/sessions";
import { NOTIFICATION_TYPES } from "./types";
firebase.initializeApp(firebaseConfig);

const NotificationHandler: React.FC = () => {
  const accessToken = useSelector(tokenSelector);
  const doctor = useSelector(doctorSelector);
  const dispatch = useDispatch();
  React.useEffect(() => {
    let unsubscribe: () => void = firebase.messaging().onMessage(notificationHandler);

    async function setupNotifications() {
      const granted = await requestPermission();
      if (granted) {
        // await registerAppWithFCM();
        const fcmToken = await firebase.messaging().getToken();
        await postDevice(accessToken, fcmToken, Platform.OS);
        console.log({ fcmToken });
      }
    }
    setupNotifications();

    return unsubscribe;
  }, []);

  async function requestPermission(): Promise<boolean> {
    try {
      await firebase.messaging().requestPermission();
      return true;
    } catch (e) {
      return false;
    }
  }

  const notificationHandler = React.useCallback(
    async function (message: any) {
      console.log("new message", message);
      if (message.data && message.data.type === NOTIFICATION_TYPES.NEW_DOCTOR_SESSION) {
        console.log("received message");
        dispatch(searchedDoctorSessionsAction(await getDoctorSessions(accessToken, doctor._id)));
      }
    },
    [doctor]
  );

  return null;
};

export default NotificationHandler;
