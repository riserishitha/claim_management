import React, { useState } from 'react';
import { createClaim } from '../services/claimService';

const ClaimForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    claimAmount: '',
    description: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createClaim(form);
    alert('Claim submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="number" name="claimAmount" placeholder="Claim Amount" onChange={handleChange} required />
      <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
      <button type="submit">Submit Claim</button>
    </form>
  );
};

export default ClaimForm;
