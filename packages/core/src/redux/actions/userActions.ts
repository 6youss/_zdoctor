import { IUser } from "../../../../../@types";

export enum UserActionTypes {
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT"
}
export interface UserAction {
  type: UserActionTypes;
  payload: IUser | undefined;
}

export function signInAction(payload: IUser): UserAction {
  return {
    type: UserActionTypes.SIGN_IN,
    payload
  };
}
export function signOutAction(): UserAction {
  return {
    type: UserActionTypes.SIGN_OUT,
    payload: undefined
  };
}
