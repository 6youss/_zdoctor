export interface RouterProps {
  isLoading: boolean;
  needAuth: boolean;
  userType: "doctor" | "patient";
}

export type IMobileRoutes =
  | "Splash"
  | "Login"
  | "FindDoctor"
  | "ReservationCalendar"
  | "PatientProfile"
  | "DoctorCalendar"
  | "DoctorProfile"
  | "DoctorAvailablities"
  | "SessionDetail";

export type IWebRoutes =
  | "/"
  | "/login"
  | "/patient/find-doctor"
  | "/patient/reservation"
  | "/patient/profile"
  | "/doctor/calendar"
  | "/doctor/profile"
  | "/doctor/availablities"
  | "/doctor/session/:id";

export type IRoutes = IMobileRoutes | IWebRoutes;
