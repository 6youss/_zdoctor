import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import {
  Splash,
  FindDoctor,
  ReservationCalendar,
  Login,
  Signup,
  DoctorCalendar,
  DoctorProfile,
  SessionDetail,
  PatientProfile,
  DoctorAvailablities,
} from "../screens";
import { RouterProps, routes } from "./types";

const Stack = createStackNavigator();

const defaultOptions: StackNavigationOptions = {
  headerShown: false,
};

const Router: React.FC<RouterProps> = ({ userType, isLoading, needAuth }) => {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      {isLoading ? (
        <Stack.Screen name={routes.splash} component={Splash} />
      ) : needAuth ? (
        <>
          <Stack.Screen name={routes.login} component={Login} />
          <Stack.Screen name={routes.signUp} component={Signup} />
        </>
      ) : userType === "patient" ? (
        <>
          <Stack.Screen name={routes.findDoctor} component={FindDoctor} />
          <Stack.Screen name={routes.patientReservation} component={ReservationCalendar} />
          <Stack.Screen name={routes.patientProfile} component={PatientProfile} />
        </>
      ) : (
        <>
          <Stack.Screen name={routes.doctorCalendar} component={DoctorCalendar} />
          <Stack.Screen name={routes.doctorProfile} component={DoctorProfile} />
          <Stack.Screen name={routes.doctorAvailibities} component={DoctorAvailablities} />
          <Stack.Screen name={routes.doctorSession} component={SessionDetail} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Router;
