import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:3000/claims"; 
const CLOUDINARY_URL = "CLOUDINARY_URL=cloudinary://875961477451865:k1pH03Gqg9L6n_X9XZPYL0-F_Ec@dvl5fdg7f";
const CLOUDINARY_UPLOAD_PRESET = "dvl5fdg7f";
const ClaimForm = () => {
  const [claims, setClaims] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    claimAmount: "",
    description: "",
    documentUrl: "",
  });
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    const response = await axios.get(API_URL);
    setClaims(response.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(CLOUDINARY_URL, formData);
    setFormData((prev) => ({ ...prev, documentUrl: response.data.secure_url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, formData);
      setEditingId(null);
    } else {
      await axios.post(API_URL, formData);
    }
    setFormData({ name: "", email: "", claimAmount: "", description: "", documentUrl: "" });
    fetchClaims();
  };

  const handleEdit = (claim) => {
    setFormData(claim);
    setEditingId(claim.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchClaims();
  };

  return (
    <div>
      <h2>Claim Form</h2>
      <div className="text-3xl font-bold text-blue-500 text-center mt-10">
    Tailwind CSS is Working!
  </div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="number" name="claimAmount" value={formData.claimAmount} onChange={handleChange} placeholder="Claim Amount" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
        <input type="file" onChange={handleFileUpload} required />
        <button type="submit">{editingId ? "Update" : "Submit"}</button>
      </form>

      <h2>Claims List</h2>
      <ul>
        {claims.map((claim) => (
          <li key={claim.id}>
            {claim.name} - {claim.email} - {claim.claimAmount} - {claim.description}
            {claim.documentUrl && <a href={claim.documentUrl} target="_blank" rel="noopener noreferrer">View Document</a>}
            <button onClick={() => handleEdit(claim)}>Edit</button>
            <button onClick={() => handleDelete(claim.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClaimForm;
