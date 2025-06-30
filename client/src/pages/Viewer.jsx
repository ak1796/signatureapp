import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Draggable from "react-draggable";
import SignaturePad from "../components/SignaturePad";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Viewer = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [signatureImg, setSignatureImg] = useState(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const onFileChange = (e) => setFile(e.target.files[0]);
  const onSignatureImageChange = (e) =>
    setSignatureImg(URL.createObjectURL(e.target.files[0]));
  const onSignatureDrawn = (dataUrl) => setSignatureImg(dataUrl);
  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">PDF Viewer + Signature</h2>

      <input type="file" accept="application/pdf" onChange={onFileChange} />
      <br />
      <input
        type="file"
        accept="image/*"
        onChange={onSignatureImageChange}
        className="my-2"
      />

      <SignaturePad onSave={onSignatureDrawn} />

      <div className="relative border mt-4 inline-block">
        {file && (
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={1} />
          </Document>
        )}

        {signatureImg && (
          <Draggable
            position={position}
            onStop={(e, data) => setPosition({ x: data.x, y: data.y })}
          >
            <img
              src={signatureImg}
              alt="Signature"
              className="absolute"
              style={{ width: "100px", cursor: "move", top: 0, left: 0, zIndex: 10 }}
            />
          </Draggable>
        )}
      </div>
    </div>
  );
};

export default Viewer;

