import React from "react";
import { BrowserRouter, Route, Switch, Redirect, useHistory, useParams } from "react-router-dom";
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
import { IRoutes } from "./types";

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
            <Redirect from="*" to="/patient/find-doctor" />
            <Route exact path="/patient/find-doctor" component={FindDoctor} />
            <Route exact path="/patient/reservation" component={ReservationCalendar} />
            <Route exact path="/patient/profile" component={PatientProfile} />
          </>
        ) : (
          <>
            <Redirect from="*" to="/doctor/calendar" />
            <Route exact path="/doctor/calendar" component={DoctorCalendar} />
            <Route exact path="/doctor/profile" component={DoctorProfile} />
            <Route exact path="/doctor/availablities" component={DoctorAvailablities} />
            <Route exact path="/doctor/session/:id" component={SessionDetail} />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

export const useUnifiedNavigation = () => {
  const history = useHistory();
  const params = useParams();
  function goBack() {
    history.goBack();
  }
  const navigate = (route: IRoutes, params?: any) => {
    if (history) {
      let _route: string = route;
      if (params) {
        for (let paramName of Object.keys(params)) {
          _route = route.replace(":" + paramName, params[paramName]);
        }
      }
      history.push(_route);
    }
  };
  return {
    navigation: null as any,
    history,
    params,
    goBack,
    navigate
  };
};
