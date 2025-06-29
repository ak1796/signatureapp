import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    api.get('/api/docs').then((res) => setDocs(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Your Documents</h2>
      <Link to="/upload" className="text-blue-500">+ Upload PDF</Link>
      <ul className="mt-4">
        {docs.map((doc) => (
          <li key={doc._id}>
            <Link to={`/document/${doc._id}`} className="text-blue-600 underline">
              {doc.filename}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
