import React from "react";
import Router from "./Router";
import { useSelector } from "react-redux";
import { tokenSelector, userTypeSelector } from "../redux/selectors";
import NotificationHandler from "../components/NotificationHandler";

export default function Navigation() {
  const [isLoading, setIsLoading] = React.useState(true);
  const accessToken = useSelector(tokenSelector);
  const needAuth = !accessToken;
  const userType = useSelector(userTypeSelector);

  React.useEffect(() => {
    async function auth() {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    auth();
  }, []);

  return (
    <>
      <Router isLoading={isLoading} needAuth={needAuth} userType={userType} />
      {!needAuth && <NotificationHandler />}
    </>
  );
}
