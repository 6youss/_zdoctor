import { useHistory, useParams } from "react-router-dom";
import { IRoutes } from "./types";
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
