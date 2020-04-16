import { UserAction, UserActionTypes } from "../actions/userActions";
import { IUser } from "../../../../../@types";

export interface IUserStore extends IUser {
  loading: boolean;
}

const initState: IUserStore = {
  id: "default",
  username: "default",
  userType: "patient",
  accessToken: undefined,
  refreshToken: undefined,
  loading: true,
};

function reducer(prevState: IUserStore = initState, action: UserAction): IUserStore {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_PENDING:
      return {
        ...prevState,
        loading: true,
      };
    case UserActionTypes.SIGN_IN_REJECTED:
      return {
        ...prevState,
        loading: false,
      };
    case UserActionTypes.SIGN_IN_SUCESS:
      return {
        ...prevState,
        ...action.payload,
        loading: false,
      };
    case UserActionTypes.SIGN_OUT:
      return initState;
    default:
      return prevState;
  }
}

export default reducer;
