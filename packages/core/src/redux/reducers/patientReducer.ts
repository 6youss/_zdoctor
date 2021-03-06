import { PatientAction } from "../actions/patientActions";
import { IPatient } from "../../../../../@types";

const initState: IPatient = {
  _id: "random id",
  firstName: "Patient",
  lastName: "Name"
};

function reducer(prevState: IPatient = initState, action: PatientAction): IPatient {
  switch (action.type) {
    case "SET_PATIENT":
      return {
        ...prevState,
        ...action.payload
      };

    default:
      return prevState;
  }
}

export default reducer;
