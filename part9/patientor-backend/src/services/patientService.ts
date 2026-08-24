import { v4 as uuid } from 'uuid';
import patientsData from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient, Entry, EntryWithoutId } from '../types';

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

const getPatient = (id: string): Patient | undefined => {
  return patientsData.find(p => p.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...entry
  };
  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const patient = patientsData.find(p => p.id === patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }
  const newEntry = {
    id: uuid(),
    ...entry
  } as Entry;

  patient.entries.push(newEntry);
  return newEntry;
};

export default { getEntries, getNonSensitiveEntries, getPatient, addPatient, addEntry };
