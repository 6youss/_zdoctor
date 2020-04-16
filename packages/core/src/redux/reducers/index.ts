import { combineReducers, Action } from "redux";
import user from "./userReducer";
import patient from "./patientReducer";
import doctor from "./doctorReducer";
import sessions from "./sessionsReducer";
import { ThunkAction } from "redux-thunk";

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

const rootReducer = combineReducers({
  user,
  patient,
  doctor,
  sessions,
});

export default rootReducer;
