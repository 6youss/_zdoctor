import {IPatient} from '../../types';

export enum PatientActionTypes {
  SET_PATIENT = 'SET_PATIENT',
}
export interface PatientAction {
  type: PatientActionTypes;
  payload: any;
}

export function setPatientAction(patientProfile: IPatient): PatientAction {
  return {
    type: PatientActionTypes.SET_PATIENT,
    payload: patientProfile,
  };
}
