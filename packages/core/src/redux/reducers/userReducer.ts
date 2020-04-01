import { UserAction } from "../actions/userActions";
import { IUser } from "../../../../../@types";

const initState: IUser = {
  id: "khkh",
  username: "patient",
  userType: "patient",
  accessToken: undefined,
  refreshToken: undefined
};

function reducer(prevState: IUser = initState, action: UserAction): IUser {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...prevState,
        ...action.payload
      };
    case "SIGN_OUT":
      return initState;
    default:
      return prevState;
  }
}

export default reducer;
