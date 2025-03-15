import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageClaim = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    status: "Pending",
    approvedAmount: 0,
    insurerComments: "",
  });

  // Fetch claim details on component mount
  useEffect(() => {
    const fetchClaimDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Unauthorized access! Please login.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/claims/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setClaim(response.data);
        setFormData({
          status: response.data.status || "Pending",
          approvedAmount: response.data.approvedAmount || 0,
          insurerComments: response.data.insurerComments || "",
        });

        setLoading(false);
      } catch (error) {
        setError("Failed to fetch claim details.",error);
        setLoading(false);
      }
    };

    fetchClaimDetails();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      let updatedData = { ...prev, [name]: value };

      if (name === "approvedAmount") {
        updatedData.approvedAmount = value === "" ? "" : Number(value);
      }

      if (name === "status" && value !== "Approved") {
        updatedData.approvedAmount = 0;
      }

      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }
  
    const updatedData = {
      ...claim,
      ...formData,
      approvedAmount: formData.status === "Approved" ? formData.approvedAmount : 0,
    };
  
    try {
      await axios.put(`http://localhost:3000/claims/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      alert("Claim updated successfully!");
  
      navigate("/insurer-dashboard");
  
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };
  
  if (loading) return <p className="text-gray-700">Loading claim details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Manage Claim</h2>

      <div className="border p-4 mb-4 bg-gray-100 rounded">
        <p><strong>Name:</strong> {claim.name}</p>
        <p><strong>Email:</strong> {claim.email}</p>
        <p><strong>Claim Amount:</strong> ₹{claim.claimAmount}</p>
        <p><strong>Description:</strong> {claim.description}</p>
        <p><strong>Uploaded Document:</strong></p>
        <img 
          src={claim.documentUrl} 
          alt="Uploaded Document" 
          className="w-full max-h-60 object-contain border rounded" 
        />
      </div>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Status:
          <select 
            name="status" 
            value={formData.status} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>

        <label className="block mb-2">
          Approved Amount:
          <input
            type="number"
            name="approvedAmount"
            value={formData.approvedAmount}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>

        <label className="block mb-2">
          Insurer Comments:
          <textarea 
            name="insurerComments" 
            value={formData.insurerComments} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
          ></textarea>
        </label>

        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded w-full mt-4"
        >
          Update Claim
        </button>
      </form>
    </div>
  );
};

export default ManageClaim;
