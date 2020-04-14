export interface RouterProps {
  isLoading: boolean;
  needAuth: boolean;
  userType: "doctor" | "patient";
}

interface RoutesMap {
  splash: "/";
  login: "/login";
  signUp: "/signUp";
  findDoctor: "/patient/find-doctor";
  patientReservation: "/patient/reservation";
  patientProfile: "/patient/profile";
  doctorCalendar: "/doctor/calendar";
  doctorProfile: "/doctor/profile";
  doctorAvailibities: "/doctor/availablities";
  doctorSession: "/doctor/session/:id";
}

export const routes: RoutesMap = {
  splash: "/",
  login: "/login",
  signUp: "/signUp",
  findDoctor: "/patient/find-doctor",
  patientReservation: "/patient/reservation",
  patientProfile: "/patient/profile",
  doctorCalendar: "/doctor/calendar",
  doctorProfile: "/doctor/profile",
  doctorAvailibities: "/doctor/availablities",
  doctorSession: "/doctor/session/:id",
};

export type IRoutes =
  | "/"
  | "/login"
  | "/signUp"
  | "/patient/find-doctor"
  | "/patient/reservation"
  | "/patient/profile"
  | "/doctor/calendar"
  | "/doctor/profile"
  | "/doctor/availablities"
  | "/doctor/session/:id";
