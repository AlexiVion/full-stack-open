import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Patient, Diagnosis } from '../types';
import EntryDetails from './EntryDetails';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Typography, Box } from '@mui/material';

const PatientPage = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const response = await axios.get<Patient>(`http://localhost:3001/api/patients/${id}`);
        setPatient(response.data);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) return null;

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        {patient.name} {patient.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </Typography>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>

      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 2, fontWeight: 'bold' }}>
        entries
      </Typography>
      {patient.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </Box>
  );
};

export default PatientPage;
