import { Patient, Gender } from '../types';

const patients: Patient[] = [
  {
    id: 'd2773336-f723-11e9-8f0b-362b9e155667',
    name: 'John McClane',
    dateOfBirth: '1970-04-25',
    ssn: '090470-123X',
    gender: Gender.Male,
    occupation: 'New York cop',
    entries: [
      {
        id: 'd811e46d-70b3-4d73-b6b6-da1157251042',
        date: '2015-01-02',
        type: 'Hospital',
        specialist: 'MD House',
        diagnosisCodes: ['S03.5', 'J10.1'],
        description: 'Healing after an accident',
        discharge: {
          date: '2015-01-16',
          criteria: 'Thumb has healed.',
        },
      }
    ]
  },
  {
    id: 'd2773598-f723-11e9-8f0b-362b9e155667',
    name: 'Martin Riggs',
    dateOfBirth: '1979-05-09',
    ssn: '090579-123Y',
    gender: Gender.Male,
    occupation: 'LA cop',
    entries: []
  }
];

export default patients;
