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
import { RouterProps } from "./types";
const Stack = createStackNavigator();

const defaultOptions: StackNavigationOptions = {
  headerShown: false
};

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
