import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dvl5fdg7f/upload";
const CLOUDINARY_UPLOAD_PRESET = "TD6QKTA";

const submitClaim = async (claimData) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const response = await axios.post("http://localhost:3000/claims", claimData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });

    return response.data;
  } catch {
    return null;
  }
};

const SubmitClaim = () => {
  const navigate = useNavigate();
  const { patientId } = useParams();
  const [claimData, setClaimData] = useState({
    name: "",
    email: "",
    claimAmount: "",
    description: "",
    patientId,
    documentUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => setClaimData({ ...claimData, [e.target.name]: e.target.value });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      setClaimData((prev) => ({ ...prev, documentUrl: response.data.secure_url }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!claimData.documentUrl) {
      setLoading(false);
      return;
    }

    const responseData = await submitClaim(claimData);
    if (responseData) navigate("/patient-dashboard");

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Submit Claim</h2>

        <div className="space-y-4">
          <input type="text" name="name" placeholder="Name" value={claimData.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />

          <input type="email" name="email" placeholder="Email" value={claimData.email} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />

          <input type="number" name="claimAmount" placeholder="Claim Amount" value={claimData.claimAmount} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />

          <textarea name="description" placeholder="Claim Description" value={claimData.description} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"></textarea>

          <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded-lg" disabled={uploading} />

          <button type="submit" className={`w-full p-3 text-white rounded-lg transition ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`} disabled={loading}>
            {loading ? "Submitting..." : "Submit Claim"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitClaim;
