import { v4 as uuid } from 'uuid';
import patientsData from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';

const getEntries = (): Patient[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default { getEntries, getNonSensitiveEntries, addPatient };
