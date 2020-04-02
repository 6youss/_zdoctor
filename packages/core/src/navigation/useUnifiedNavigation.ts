import { useNavigation, useRoute } from "@react-navigation/native";
import { IRoutes } from "./types";
export const useUnifiedNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  function goBack() {
    navigation.goBack();
  }
  const navigate = (route: IRoutes, params?: any) => {
    if (navigation) {
      return navigation.navigate(route, params);
    }
  };
  return {
    history: null as any,
    navigation,
    params: route.params as any,
    goBack,
    navigate
  };
};
