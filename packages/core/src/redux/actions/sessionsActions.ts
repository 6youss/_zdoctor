import { ISession } from "../../../../../@types";

export enum SessionsActionTypes {
  SET_SEARCHED_DOCTOR_SESSIONS = "SET_SEARCHED_DOCTOR_SESSIONS"
}
export interface SessionsAction {
  type: SessionsActionTypes;
  payload: Array<ISession>;
}

export function setSearchedDoctorSessionsAction(sessions: Array<ISession>): SessionsAction {
  return {
    type: SessionsActionTypes.SET_SEARCHED_DOCTOR_SESSIONS,
    payload: sessions
  };
}
