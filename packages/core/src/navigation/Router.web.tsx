import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
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
            <Route exact path="/" component={Splash} />
          </>
        ) : needAuth ? (
          <>
            <Redirect from="*" to="/login" />
            <Route exact path="/login" component={Login} />
          </>
        ) : userType === "patient" ? (
          <>
            <Redirect from="*" to="/FindDoctor" />
            <Route exact path="/FindDoctor" component={FindDoctor} />
            <Route exact path="/ReservationCalendar" component={ReservationCalendar} />
            <Route exact path="/PatientProfile" component={PatientProfile} />
          </>
        ) : (
          <>
            <Redirect from="*" to="/DoctorCalendar" />
            <Route exact path="/DoctorCalendar" component={DoctorCalendar} />
            <Route exact path="/DoctorProfile" component={DoctorProfile} />
            <Route exact path="/DoctorAvailablities" component={DoctorAvailablities} />
            <Route exact path="/SessionDetail" component={SessionDetail} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
