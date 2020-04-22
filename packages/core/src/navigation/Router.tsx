import React from "react";
import { createDrawerNavigator, DrawerNavigationOptions } from "@react-navigation/drawer";
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
// import SideMenu from "./SideMenu";

const Drawer = createDrawerNavigator();

const defaultOptions: DrawerNavigationOptions = {};

const Router: React.FC<RouterProps> = ({ userType, isLoading, needAuth }) => {
  return (
    <Drawer.Navigator drawerContent={({ navigation }) => null} screenOptions={defaultOptions}>
      {isLoading ? (
        <Drawer.Screen name={routes.splash} component={Splash} />
      ) : needAuth ? (
        <>
          <Drawer.Screen name={routes.login} component={Login} />
          <Drawer.Screen name={routes.signUp} component={Signup} />
        </>
      ) : userType === "patient" ? (
        <>
          <Drawer.Screen name={routes.findDoctor} component={FindDoctor} />
          <Drawer.Screen name={routes.patientReservation} component={ReservationCalendar} />
          <Drawer.Screen name={routes.patientProfile} component={PatientProfile} />
        </>
      ) : (
        <>
          <Drawer.Screen name={routes.doctorCalendar} component={DoctorCalendar} />
          <Drawer.Screen name={routes.doctorProfile} component={DoctorProfile} />
          <Drawer.Screen name={routes.doctorAvailibities} component={DoctorAvailablities} />
          <Drawer.Screen name={routes.doctorSession} component={SessionDetail} />
        </>
      )}
    </Drawer.Navigator>
  );
};

export default Router;
