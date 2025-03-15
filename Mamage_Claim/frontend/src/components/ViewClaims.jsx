import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ClaimsTable = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const { patientId } = useParams();

  useEffect(() => {
    console.log("Fetching claims for Patient ID:", patientId);
    if (!patientId) return;

    const token = localStorage.getItem("token");

    fetch(`http://localhost:3000/claims/patient/${patientId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Claims Data:", data);
        setClaims(Array.isArray(data) && data.length > 0 ? data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching claims:", error);
        setLoading(false);
      });
  }, [patientId]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Claims for Patient ID: {patientId}
      </h2>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Loading claims...</p>
      ) : claims.length === 0 ? (
        <p className="text-center text-lg text-red-500">No claims found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Claim Amount</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Submission Date</th>
                <th className="py-2 px-4 border">Insurer Comments</th>
                <th className="py-2 px-4 border">Approved Amount</th>
                <th className="py-2 px-4 border">Document</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((claim, index) => (
                <tr
                  key={index}
                  className="border hover:bg-gray-100 transition duration-300"
                >
                  <td className="py-2 px-4 border">{claim.name}</td>
                  <td className="py-2 px-4 border">{claim.email}</td>
                  <td className="py-2 px-4 border">${claim.claimAmount}</td>
                  <td className="py-2 px-4 border">
                    {claim.description || "N/A"}
                  </td>
                  <td
                    className={`py-2 px-4 border ${
                      claim.status === "Approved"
                        ? "text-green-600 font-semibold"
                        : claim.status === "Rejected"
                        ? "text-red-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }`}
                  >
                    {claim.status}
                  </td>
                  <td className="py-2 px-4 border">
                    {new Date(claim.submissionDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {claim.insurerComments || "No Comments"}
                  </td>
                  <td className="py-2 px-4 border">
                    {claim.approvedAmount ? `$${claim.approvedAmount}` : "N/A"}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {claim.documentUrl ? (
                      <a
                        href={claim.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Document
                      </a>
                    ) : (
                      "No Document"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClaimsTable;
