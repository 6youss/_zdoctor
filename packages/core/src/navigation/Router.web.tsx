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
  DoctorAvailablities,
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
            <Route exact path="/login" component={Login} />
            <Redirect from="*" to="/login" />
          </>
        ) : userType === "patient" ? (
          <>
            <Route exact path="/patient/find-doctor" component={FindDoctor} />
            <Route exact path="/patient/reservation" component={ReservationCalendar} />
            <Route exact path="/patient/profile" component={PatientProfile} />
            <Redirect from="*" to="/patient/find-doctor" />
          </>
        ) : (
          <>
            <Route exact path="/doctor/calendar" component={DoctorCalendar} />
            <Route exact path="/doctor/profile" component={DoctorProfile} />
            <Route exact path="/doctor/availablities" component={DoctorAvailablities} />
            <Route exact path="/doctor/session/:id" component={SessionDetail} />
            <Redirect from="*" to="/doctor/calendar" />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
