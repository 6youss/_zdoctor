import { Sessions } from "../../components/SessionPicker";
import { SessionsAction } from "../actions/sessionsActions";

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

export default reducer;
