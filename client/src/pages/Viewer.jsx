import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Draggable from "react-draggable";
import { PDFDocument, rgb } from "pdf-lib";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Viewer = () => {
  const [file, setFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [signatureImg, setSignatureImg] = useState(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [selectedPage, setSelectedPage] = useState(1);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => setFileData(reader.result);
    reader.readAsArrayBuffer(file);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleSignatureImageChange = (e) => {
    setSignatureImg(URL.createObjectURL(e.target.files[0]));
  };

  const handleDownload = async () => {
    if (!fileData || !signatureImg) return alert("PDF or Signature missing!");

    const pdfDoc = await PDFDocument.load(fileData);
    const pages = pdfDoc.getPages();
    const page = pages[selectedPage - 1];

    const signatureImageBytes = await fetch(signatureImg).then((res) =>
      res.arrayBuffer()
    );
    const signatureImage = await pdfDoc.embedPng(signatureImageBytes);
    const { width, height } = page.getSize();

    const scale = 0.5;
    const imgWidth = signatureImage.width * scale;
    const imgHeight = signatureImage.height * scale;

    page.drawImage(signatureImage, {
      x: position.x,
      y: height - position.y - imgHeight, // invert Y
      width: imgWidth,
      height: imgHeight,
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "signed.pdf";
    a.click();
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">PDF Viewer + Signature</h2>

      <input type="file" accept="application/pdf" onChange={onFileChange} />
      <input type="file" accept="image/*" onChange={handleSignatureImageChange} />

      {numPages && (
        <select
          value={selectedPage}
          onChange={(e) => setSelectedPage(Number(e.target.value))}
          className="border p-1"
        >
          {Array.from({ length: numPages }, (_, i) => (
            <option key={i} value={i + 1}>
              Page {i + 1}
            </option>
          ))}
        </select>
      )}

      <div className="relative border inline-block">
        {file && (
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={selectedPage} />
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
              style={{
                width: "100px",
                position: "absolute",
                top: 0,
                left: 0,
                cursor: "move",
                zIndex: 10,
              }}
            />
          </Draggable>
        )}
      </div>

      <button
        onClick={handleDownload}
        className="bg-green-600 text-white px-4 py-2 mt-4"
      >
        Download Signed PDF
      </button>
    </div>
  );
};

export default Viewer;
