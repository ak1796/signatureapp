import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    api.get('/api/docs')
      .then((res) => {
        // Safe check: ensure res.data is an array
        if (Array.isArray(res.data)) {
          setDocs(res.data);
        } else {
          console.error("Unexpected response:", res.data);
          setDocs([]); // fallback
        }
      })
      .catch((err) => {
        console.error("API error:", err);
        setDocs([]); // fallback on error
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Your Documents</h2>
      <Link to="/upload" className="text-blue-500">+ Upload PDF</Link>

      <ul className="mt-4">
        {docs.length > 0 ? (
          docs.map((doc) => (
            <li key={doc._id}>
              <Link to={`/document/${doc._id}`} className="text-blue-600 underline">
                {doc.filename}
              </Link>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No documents uploaded yet.</p>
        )}
      </ul>
    </div>
  );
}

export default Dashboard;
