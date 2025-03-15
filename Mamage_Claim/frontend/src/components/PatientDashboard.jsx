import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PatientDashboard = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        console.log('Decoded Token:', decoded);

        fetch('http://localhost:3000/user/get-user-id', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: decoded.email }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data._id) {
              setPatientId(data._id);
            } else {
              console.log('User not found');
            }
          })
          .catch((err) => console.error('Error:', err));
      } catch (error) {
        console.error('Invalid token:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Patient Dashboard</h2>

      {user && <p className="text-gray-700 mb-4">Welcome, {user.name || user.email}</p>}
      {patientId && <p className="text-gray-600 mb-4">Your User ID: {patientId}</p>}

      <div className="flex space-x-6">
        {patientId && (
          <>
            <Link to={`/submit-claim/${patientId}`}>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                Submit a Claim
              </button>
            </Link>
            <Link to={`/view-claims/${patientId}`}>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                View Claims
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
