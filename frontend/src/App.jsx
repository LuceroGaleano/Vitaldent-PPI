import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PatientPortal from './pages/PatientPortal';
import ReceptionistPortal from './pages/ReceptionistPortal';
import OdontologistPortal from './pages/OdontologistPortal';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/patient" element={<PatientPortal />} />
        <Route path="/receptionist" element={<ReceptionistPortal />} />
        <Route path="/odontologist" element={<OdontologistPortal />} />
      </Routes>
    </Router>
  );
}

export default App;