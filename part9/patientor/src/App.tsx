import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import { Patient, Diagnosis } from './types';
import PatientPage from './components/PatientPage';
import { Container, Typography, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    axios.get<Patient[]>('http://localhost:3001/api/patients').then(res => setPatients(res.data));
    axios.get<Diagnosis[]>('http://localhost:3001/api/diagnoses').then(res => setDiagnoses(res.data));
  }, []);

  return (
    <Container>
      <Router>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>Patientor</Typography>
        <Button component={Link} to="/" variant="contained" color="primary">Home</Button>
        <Routes>
          <Route path="/" element={
            <div>
              <Typography variant="h5" style={{ marginTop: "1em", marginBottom: "0.5em" }}>Patient list</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Occupation</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.map(p => (
                    <TableRow key={p.id}>
                      <TableCell><Link to={`/patients/${p.id}`}>{p.name}</Link></TableCell>
                      <TableCell>{p.gender}</TableCell>
                      <TableCell>{p.occupation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          } />
          <Route path="/patients/:id" element={<PatientPage diagnoses={diagnoses} />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
