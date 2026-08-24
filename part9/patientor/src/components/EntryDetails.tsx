import { Entry, Diagnosis } from '../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Typography } from '@mui/material';

const EntryDetails = ({ entry, diagnoses }: { entry: Entry; diagnoses: Diagnosis[] }) => {
  const getDiagnosisName = (code: string) => {
    const diag = diagnoses.find(d => d.code === code);
    return diag ? `${code} ${diag.name}` : code;
  };

  const getHealthCheckIconColor = (rating: number) => {
    switch (rating) {
      case 0: return 'green';
      case 1: return 'yellow';
      case 2: return 'orange';
      case 3: return 'red';
      default: return 'gray';
    }
  };

  switch (entry.type) {
    case 'Hospital':
      return (
        <Box sx={{ border: '1px solid black', borderRadius: 2, padding: 2, marginBottom: 2 }}>
          <Typography variant="body1">{entry.date} <LocalHospitalIcon /></Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{entry.description}</Typography>
          <Typography variant="body2">Discharge: {entry.discharge.date} - {entry.discharge.criteria}</Typography>
          <Typography variant="body2">diagnose by {entry.specialist}</Typography>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map(code => (
                <li key={code}>{getDiagnosisName(code)}</li>
              ))}
            </ul>
          )}
        </Box>
      );
    case 'OccupationalHealthcare':
      return (
        <Box sx={{ border: '1px solid black', borderRadius: 2, padding: 2, marginBottom: 2 }}>
          <Typography variant="body1">{entry.date} <WorkIcon /> <strong>{entry.employerName}</strong></Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{entry.description}</Typography>
          {entry.sickLeave && (
            <Typography variant="body2">Sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</Typography>
          )}
          <Typography variant="body2">diagnose by {entry.specialist}</Typography>
        </Box>
      );
    case 'HealthCheck':
      return (
        <Box sx={{ border: '1px solid black', borderRadius: 2, padding: 2, marginBottom: 2 }}>
          <Typography variant="body1">{entry.date} <MedicalServicesIcon /></Typography>
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>{entry.description}</Typography>
          <FavoriteIcon sx={{ color: getHealthCheckIconColor(entry.healthCheckRating) }} />
          <Typography variant="body2">diagnose by {entry.specialist}</Typography>
        </Box>
      );
  }
};

export default EntryDetails;
