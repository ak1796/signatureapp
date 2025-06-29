import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import 'pdfjs-dist/web/pdf_viewer.css';

// Fix PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Viewer = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">PDF Viewer</h2>

      <input type="file" accept="application/pdf" onChange={onFileChange} className="mb-4" />

      {file && (
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, i) => (
            <Page key={i + 1} pageNumber={i + 1} />
          ))}
        </Document>
      )}
    </div>
  );
};

export default Viewer;


