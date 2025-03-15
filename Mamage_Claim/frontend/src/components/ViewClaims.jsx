import { useEffect, useState } from 'react';

const ViewClaims = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/claims', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((res) => res.json())
      .then((data) => setClaims(data))
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Claims</h2>
      
      {claims.length === 0 ? (
        <p className="text-center">No claims submitted yet.</p>
      ) : (
        claims.map((claim) => (
          <div key={claim._id} className="bg-white p-4 shadow-lg rounded-lg mb-4">
            <p><strong>Amount:</strong> ${claim.amount}</p>
            <p><strong>Status:</strong> {claim.status}</p>
            <p><strong>Date:</strong> {new Date(claim.submissionDate).toLocaleDateString()}</p>
            {claim.documentUrl && (
              <a
                href={claim.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                📄 View Document
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ViewClaims;
