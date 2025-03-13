import axios from 'axios';

const API_URL = 'http://localhost:3000/claims'; // Update with your backend URL

// Fetch all claims
export const getAllClaims = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a single claim by ID
export const getClaimById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Submit a new claim
export const createClaim = async (claimData) => {
  const response = await axios.post(API_URL, claimData);
  return response.data;
};

// Update a claim by ID
export const updateClaim = async (id, claimData) => {
  const response = await axios.put(`${API_URL}/${id}`, claimData);
  return response.data;
};

// Delete a claim by ID
export const deleteClaim = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
