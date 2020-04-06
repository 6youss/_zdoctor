import { Sessions } from "../../components/SessionPicker";
import { SessionsAction } from "../actions/sessionsActions";
import { ISession } from "../../../../../@types";

const initState: Sessions = [];

function reducer(prevState: Sessions = initState, action: SessionsAction): Sessions {
  switch (action.type) {
    case "SET_SEARCHED_DOCTOR_SESSIONS": {
      return action.payload;
    }
    default:
      return prevState;
  }
}

// function sessionsArrayToMap(sessionsArray: Array<ISession>): Sessions {
//   let sessionsMap: Sessions = {};
//   for (let session of sessionsArray) {
//     const date = new Date(session.date).toISOString();
//     // console.log({ date, serverdate: new Date(session.date).toISOString() });
//     const [dateString, timeWithOffset] = date.split("T");

//     if (!sessionsMap[dateString]) {
//       sessionsMap[dateString] = [];
//     }
//     sessionsMap[dateString].push({ id: session._id, time: timeWithOffset.slice(0, 5) });
//   }
//   return sessionsMap;
// }

export default reducer;
