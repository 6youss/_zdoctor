import { IUser } from "../../../../../@types";
import { postLogin, getUser } from "../../api/user";
import { setDoctorAction } from "./doctorActions";
import { setPatientAction } from "./patientActions";
import { AppThunk } from "../reducers";

export enum UserActionTypes {
  SIGN_IN_PENDING = "SIGN_IN_PENDING",
  SIGN_IN_SUCESS = "SIGN_IN_SUCESS",
  SIGN_IN_REJECTED = "SIGN_IN_REJECTED",
  SIGN_OUT = "SIGN_OUT",
}
export interface UserAction {
  type: UserActionTypes;
  payload: IUser | undefined;
}

export function login(username: string, password: string): AppThunk {
  return async (dispatch) => {
    try {
      dispatch({
        type: UserActionTypes.SIGN_IN_PENDING,
      });
      const user = await postLogin(username, password);
      const userProfile = await getUser(user.accessToken);
      if (user.userType === "doctor") {
        dispatch(setDoctorAction(userProfile.doctor));
      } else {
        dispatch(setPatientAction(userProfile.patient));
      }
      dispatch(signInAction(user));
    } catch (error) {
      dispatch({
        type: UserActionTypes.SIGN_IN_REJECTED,
      });
    }
  };
}

export function signInAction(payload: IUser): UserAction {
  return {
    type: UserActionTypes.SIGN_IN_SUCESS,
    payload,
  };
}
export function signOutAction(): UserAction {
  return {
    type: UserActionTypes.SIGN_OUT,
    payload: undefined,
  };
}
