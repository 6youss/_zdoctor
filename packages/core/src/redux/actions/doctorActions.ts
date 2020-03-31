import {IDoctor} from '../../types';

export enum DoctorActionTypes {
  SET_DOCTOR = 'SET_DOCTOR',
}

export interface DoctorAction {
  type: DoctorActionTypes;
  payload: any;
}

export function setDoctorAction(doctor: IDoctor): DoctorAction {
  return {
    type: DoctorActionTypes.SET_DOCTOR,
    payload: doctor,
  };
}
