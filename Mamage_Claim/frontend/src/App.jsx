import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Start from './components/Start';
import PatientDashboard from './components/PatientDashboard';
import SubmitClaim from './components/SubmitClaim';
import InsurerDashboard from './components/InsurerDashboard';
import ViewClaims from './components/ViewClaims';
import ManageClaim from './components/ManageClaim';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/start" element={<Start />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/submit-claim/:patientId" element={<SubmitClaim />} />
        <Route path="/view-claims/:patientId" element = {<ViewClaims/>} />
        <Route path="/insurer-dashboard" element={<InsurerDashboard />} />
        <Route path="/manage-claims/:id" element={<ManageClaim />} />
      </Routes>
    </Router>
  );
}

export default App;
