import { Sessions } from "../../components/SessionPicker";
import { IUser, IPatient, IDoctor } from "../../../../../@types";
import { combineReducers } from "redux";
import user from "./userReducer";
import patient from "./patientReducer";
import doctor from "./doctorReducer";
import sessions from "./sessionsReducer";

export interface RootState {
  user: IUser;
  patient: IPatient;
  doctor: IDoctor;
  sessions: Sessions;
}

export default combineReducers({
  user,
  patient,
  doctor,
  sessions
})
