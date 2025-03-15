import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 shadow-md py-4 px-8 flex justify-between items-center">
      {/* Left Side: Logo (Clickable - Navigates to "/") */}
      <Link to="/" className="text-white text-2xl font-bold hover:underline">
        Insurance
      </Link>

      {/* Right Side: Buttons */}
      <div className="flex space-x-4">
        <Link to="/register">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            Register
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
