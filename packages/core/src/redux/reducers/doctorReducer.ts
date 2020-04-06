import { DoctorAction, DoctorActionTypes } from "../actions/doctorActions";

import { ZTime } from "../../utils/ztime";
import { IDoctor } from "../../../../../@types";

const initState: IDoctor = {
  _id: "random id",
  firstName: "default name",
  lastName: "default last name",
  address: "default address",
  phone: "default phone",
  unavailablities: [],
  reservationType: "time",
  sessionDurations: [
    {
      from: new Date(new Date().setUTCHours(8)),
      to: null,
      duration: 30,
    },
  ],
  workingHours: [
    {
      from: new Date(),
      to: null,
      opensAt: ZTime.timeStringToMinutes("08:00"),
      closesAt: ZTime.timeStringToMinutes("17:00"),
    },
  ],
};

function reducer(prevState: IDoctor = initState, action: DoctorAction): IDoctor {
  switch (action.type) {
    case DoctorActionTypes.SET_DOCTOR:
      return {
        ...prevState,
        ...action.payload,
      };
    default:
      return prevState;
  }
}

export default reducer;
