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
      from: ZTime.setDateAtTime(new Date(), ZTime.fromHours(8)),
      to: null,
      duration: 30
    }
  ],
  workingHours: [
    {
      from: new Date(),
      to: null,
      opensAt: ZTime.fromString("08:00").toMinutes(),
      closesAt: ZTime.fromString("17:00").toMinutes()
    }
  ]
};

function reducer(prevState: IDoctor = initState, action: DoctorAction): IDoctor {
  switch (action.type) {
    case DoctorActionTypes.SET_DOCTOR:
      return {
        ...prevState,
        ...action.payload
      };
    default:
      return prevState;
  }
}

export default reducer;
