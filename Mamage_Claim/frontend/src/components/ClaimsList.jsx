import React, { useEffect, useState } from 'react';
import { getAllClaims, deleteClaim } from '../services/claimService';

const ClaimsList = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    const data = await getAllClaims();
    setClaims(data);
  };

  const handleDelete = async (id) => {
    await deleteClaim(id);
    fetchClaims(); // Refresh the list after deletion
  };

  return (
    <div>
      <h2>Claims Dashboard</h2>
      <ul>
        {claims.map((claim) => (
          <li key={claim._id}>
            {claim.name} - {claim.status} - ₹{claim.claimAmount}
            <button onClick={() => handleDelete(claim._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClaimsList;
