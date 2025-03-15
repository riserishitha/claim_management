import { Link } from 'react-router-dom';

const InsurerDashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Insurer Dashboard</h2>

      <div className="flex space-x-6">
        <Link to="/manage-claims">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Manage Claims
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InsurerDashboard;
