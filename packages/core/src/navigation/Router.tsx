import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";

import {
  Splash,
  FindDoctor,
  ReservationCalendar,
  Login,
  DoctorCalendar,
  DoctorProfile,
  SessionDetail,
  PatientProfile,
  DoctorAvailablities
} from "../screens";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  FindDoctor: undefined;
  PatientProfile: undefined;
  ReservationCalendar: undefined;
  DoctorCalendar: undefined;
  DoctorProfile: undefined;
  DoctorAvailablities: undefined;
  SessionDetail: { id: string };
};
const Stack = createStackNavigator<RootStackParamList>();

const defaultOptions: StackNavigationOptions = {
  headerShown: false
};

interface RouterProps {
  isLoading: boolean;
  needAuth: boolean;
  userType: "doctor" | "patient";
}

const Router: React.FC<RouterProps> = ({ userType, isLoading, needAuth }) => {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      {isLoading ? (
        <Stack.Screen name="Splash" component={Splash} />
      ) : needAuth ? (
        <Stack.Screen name="Login" component={Login} />
      ) : userType === "patient" ? (
        <>
          <Stack.Screen name="FindDoctor" component={FindDoctor} />
          <Stack.Screen name="ReservationCalendar" component={ReservationCalendar} />
          <Stack.Screen name="PatientProfile" component={PatientProfile} />
        </>
      ) : (
        <>
          <Stack.Screen name="DoctorCalendar" component={DoctorCalendar} />
          <Stack.Screen name="DoctorProfile" component={DoctorProfile} />
          <Stack.Screen name="DoctorAvailablities" component={DoctorAvailablities} />
          <Stack.Screen name="SessionDetail" component={SessionDetail} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Router;
