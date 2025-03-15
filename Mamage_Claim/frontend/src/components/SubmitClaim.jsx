import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const submitClaim = async (claimData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("🔴 No token found! Please log in again.");
      return null; 
    }

    const response = await axios.post("http://localhost:3000/claims", claimData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Claim submitted:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚨 Error submitting claim:", error.response?.data || error.message);
    return null; // 🔹 Return null if there's an error
  }
};

const SubmitClaim = () => {
  const navigate = useNavigate();
  const [claimData, setClaimData] = useState({
    name: "",
    email: "",
    amount: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setClaimData({ ...claimData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const responseData = await submitClaim(claimData);

      if (!responseData) {
        alert("Error submitting claim. Please try again.");
        return;
      }

      alert("Claim Submitted!");
      navigate("/patient-dashboard");
    } catch (error) {
      alert("Error submitting claim: " + (error.response?.data?.message || "An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Submit Claim
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={claimData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={claimData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="amount"
            placeholder="Claim Amount"
            value={claimData.amount}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="description"
            placeholder="Claim Description"
            value={claimData.description}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            className={`w-full p-3 text-white rounded-lg transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Claim"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitClaim;
