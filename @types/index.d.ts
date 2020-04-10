declare module "*.jpg";
declare module "*.png";
export interface IUser {
  id: string;
  username: string;
  userType: "patient" | "doctor";
  accessToken?: string;
  refreshToken?: string;
}
export interface IDoctor {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  unavailablities: Array<ClosedDateRange>;
  workingHours: Array<WorkingHours>;
  sessionDurations: Array<SessionDuration>;
  reservationType: ReservationType;
}
export interface ClosedDateRange {
  from: string;
  to: string;
}

export interface OpenedDateRange {
  from: string;
  to: string | null;
}
export interface SessionDuration extends OpenedDateRange {
  duration: number;
}

export interface WorkingHours extends OpenedDateRange {
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
