import { Patient, Gender } from '../types';

const patients: Patient[] = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'John McClane',
    dateOfBirth: '1970-04-25',
    ssn: '090470-123X',
    gender: Gender.Male,
    occupation: 'New York cop'
  },
  {
    id: 'd2773598-f723-11e9-8f0b-362b9e155667',
    name: 'Martin Riggs',
    dateOfBirth: '1979-05-09',
    ssn: '090579-123Y',
    gender: Gender.Male,
    occupation: 'LA cop'
  }
];

export default patients;
