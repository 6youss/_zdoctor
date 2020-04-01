import React from "react";
import Router from "./Router";
import { useSelector, useDispatch } from "react-redux";
import { tokenSelector, userTypeSelector } from "../redux/selectors";
import { getUser } from "../api/user";
import { setDoctorAction } from "../redux/actions/doctorActions";
import { setPatientAction } from "../redux/actions/patientActions";
import NotificationHandler from "../components/NotificationHandler";

export default function Navigation() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const [needAuth, setNeedAuth] = React.useState(true);

  const accessToken = useSelector(tokenSelector);
  const userType = useSelector(userTypeSelector);

  React.useEffect(() => {
    async function auth() {
      try {
        setIsLoading(true);
        if (!accessToken) {
          throw new Error("access token not found");
        }
        const userProfile = await getUser(accessToken);
        if (userType === "doctor") {
          dispatch(setDoctorAction(userProfile.doctor));
        } else {
          dispatch(setPatientAction(userProfile.patient));
        }
        setNeedAuth(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log({ error: error.message });
        setIsLoading(false);
        setNeedAuth(true);
      }
    }
    auth();
  }, [accessToken, dispatch]);

  return (
    <>
      <Router needAuth={needAuth} isLoading={isLoading} userType={userType} />
      {!needAuth && <NotificationHandler />}
    </>
  );
}
