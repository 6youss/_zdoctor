import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
import { routes } from "./types";

interface RouterProps {
  isLoading: boolean;
  needAuth: boolean;
  userType: "doctor" | "patient";
}

const Router: React.FC<RouterProps> = ({ userType, isLoading, needAuth }) => {
  return (
    <BrowserRouter>
      <Switch>
        {isLoading ? (
          <>
            <Redirect from="*" to="/" />
            <Route exact path={routes.splash} component={Splash} />
          </>
        ) : needAuth ? (
          <>
            <Route exact path={routes.login} component={Login} />
            <Route exact path={routes.signUp} component={Signup} />
            <Redirect from="*" to={routes.signUp} />
          </>
        ) : userType === "patient" ? (
          <>
            <Route exact path={routes.findDoctor} component={FindDoctor} />
            <Route exact path={routes.patientReservation} component={ReservationCalendar} />
            <Route exact path={routes.patientProfile} component={PatientProfile} />
            <Redirect from="*" to={routes.findDoctor} />
          </>
        ) : (
          <>
            <Route exact path={routes.doctorCalendar} component={DoctorCalendar} />
            <Route exact path={routes.doctorProfile} component={DoctorProfile} />
            <Route exact path={routes.doctorAvailibities} component={DoctorAvailablities} />
            <Route exact path={routes.doctorSession} component={SessionDetail} />
            <Redirect from="*" to={routes.doctorCalendar} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
