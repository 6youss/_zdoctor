declare module "*.jpg";
declare module "*.png";
export interface IUser {
  id: string;
  username: string;
  userType: "patient" | "doctor";
  accessToken: string | undefined;
  refreshToken: string | undefined;
}
export interface IDoctor {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  unavailablities: Array<DateRange>;
  workingHours: Array<WorkingHours>;
  sessionDurations: Array<SessionDuration>;
  reservationType: ReservationType;
}
export interface DateRange {
  from: Date;
  to: Date | null;
}
export interface SessionDuration extends DateRange {
  duration: number;
}

export interface WorkingHours extends DateRange {
  opensAt: number;
  closesAt: number;
}

export type ReservationType = "counter" | "time";

export interface IPatient {
  _id: string;
  firstName: string;
  lastName: string;
}
export interface IUserProfile {
  patient: IPatient;
  doctor: IDoctor;
}
export interface ISession {
  _id: string;
  patient: string;
  doctor: string;
  date: string;
}
export interface ISessionDetails {
  _id: string;
  date: string;
  patientDetails: IPatient;
}

export { RootStackParamList } from "./Router";
export { RootState } from "./redux/reducers/index";
