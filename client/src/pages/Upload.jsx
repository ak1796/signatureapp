import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("No file selected");

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      await axios.post("/api/docs/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully!");
    } catch (err) {
  console.error("Upload Error:", err.response?.data || err.message);
  alert("Upload failed.");
}
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Upload PDF</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
        <button className="bg-blue-600 text-white px-4 py-2">Upload</button>
      </form>
    </div>
  );
};

export default Upload;
