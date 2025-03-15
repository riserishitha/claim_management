import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Patient Dashboard</h2>

      <div className="flex space-x-6">
        <Link to="/submit-claim">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Submit a Claim
          </button>
        </Link>
        <Link to="/view-claims">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            View Claims
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PatientDashboard;
