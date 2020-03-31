import { Sessions } from "../../components/SessionPicker";
import { SessionsAction } from "../actions/sessionsActions";
import { getStringFromDate } from "../../utils/zdate";
import { ISession } from "../../../../../@types";

const initState: Sessions = {};

function reducer(prevState: Sessions = initState, action: SessionsAction): Sessions {
  switch (action.type) {
    case "SET_SEARCHED_DOCTOR_SESSIONS": {
      return {
        ...prevState,
        ...sessionsArrayToMap(action.payload)
      };
    }
    default:
      return prevState;
  }
}

function sessionsArrayToMap(sessionsArray: Array<ISession>): Sessions {
  let sessionsMap: Sessions = {};
  for (let session of sessionsArray) {
    const date = getStringFromDate(new Date(session.date), true);

    const [dateString, timeString] = date.split("T");

    if (!sessionsMap[dateString]) {
      sessionsMap[dateString] = [];
    }
    sessionsMap[dateString].push({ id: session._id, time: timeString });
  }
  return sessionsMap;
}

export default reducer;
