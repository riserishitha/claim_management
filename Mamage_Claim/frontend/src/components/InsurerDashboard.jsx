import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const InsurerDashboard = () => {
  const [claims, setClaims] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized access! Please login.");
      navigate("/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role !== "insurer") {
        alert("Access denied! Only insurers can access this page.");
        navigate("/login");
        return;
      }

      const fetchClaims = async () => {
        try {
          const response = await fetch("http://localhost:3000/claims", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) throw new Error("Failed to fetch claims");

          const data = await response.json();
          setClaims(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchClaims();
    } catch (error) {
      alert("Invalid token. Please login again.",error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);
console.log(claims,"approveee")
  const formatAmount = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

  const getFormattedDate = (claim) => {
    const date = claim.updatedAt || claim.createdAt;
    return date ? new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }) : "N/A";
  };

  const filteredClaims = claims.filter((claim) => {
    const matchesStatus = filterStatus === "All" || claim.status === filterStatus;
    const claimDate = claim.updatedAt ? new Date(claim.updatedAt) : claim.createdAt ? new Date(claim.createdAt) : null;
    const matchesStartDate = startDate ? claimDate >= new Date(startDate) : true;
    const matchesEndDate = endDate ? claimDate <= new Date(endDate) : true;

    return matchesStatus && matchesStartDate && matchesEndDate;
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Insurer Dashboard</h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-700">Loading claims...</p>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-4">
            <div>
              <label className="block text-lg font-semibold">Filter by Status:</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="p-2 border rounded">
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-semibold">Start Date:</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="p-2 border rounded" />
            </div>
            <div>
              <label className="block text-lg font-semibold">End Date:</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="p-2 border rounded" />
            </div>
          </div>

          <table className="w-full max-w-4xl bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Claim Amount</th>
                <th className="p-3 text-left">Approved Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.length > 0 ? (
                filteredClaims.map((claim) => (
                  <tr key={claim._id} className="border-b">
                    <td className="p-3">{getFormattedDate(claim)}</td>
                    <td className="p-3">{formatAmount(claim.claimAmount)}</td>
                    <td className="p-3">{formatAmount(claim.approvedAmount||0)}</td>
                    <td className="p-3">{claim.status || "Pending"}</td>
                    <td className="p-3">
                      <Link to={`/manage-claims/${claim._id}`}>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Review</button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-gray-500">No claims found</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default InsurerDashboard;
