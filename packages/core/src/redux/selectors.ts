import { Sessions } from "../components/SessionPicker";
import { RootState } from "./reducers";
import { IDoctor, IPatient } from "../../../../@types";

export function doctorSelector(store: RootState): IDoctor {
  return store.doctor;
}
export function patientSelector(store: RootState): IPatient {
  return store.patient;
}

export function sessionsSelector(store: RootState): Sessions {
  return store.sessions;
}

export function tokenSelector(store: RootState): string | undefined {
  return store.user.accessToken;
}

export function userTypeSelector(store: RootState): "doctor" | "patient" {
  return store.user.userType;
}

export function loginPending(store: RootState): boolean {
  return store.user.loading;
}
