import { Sessions } from "../../components/SessionPicker";
import { IUser, IPatient, IDoctor } from "../../../../../@types";

export interface RootState {
  user: IUser;
  patient: IPatient;
  doctor: IDoctor;
  sessions: Sessions;
}
export { default as user } from "./userReducer";
export { default as patient } from "./patientReducer";
export { default as doctor } from "./doctorReducer";
export { default as sessions } from "./sessionsReducer";
