import React, { useRef } from "react";

const SignaturePad = ({ onSave }) => {
  const canvasRef = useRef(null);

  const handleClear = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleSave = () => {
    const dataUrl = canvasRef.current.toDataURL("image/png");
    onSave(dataUrl); // send to parent
  };

  const startDraw = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvasRef.current.addEventListener("mousemove", draw);
  };

  const stopDraw = () => {
    canvasRef.current.removeEventListener("mousemove", draw);
  };

  const draw = (e) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  };

  return (
    <div className="my-4">
      <h4 className="font-semibold">Draw Signature Below:</h4>
      <canvas
        ref={canvasRef}
        width={300}
        height={100}
        className="border border-black"
        onMouseDown={startDraw}
        onMouseUp={stopDraw}
      />
      <br />
      <button onClick={handleClear} className="bg-red-500 text-white px-2 py-1 mr-2">
        Clear
      </button>
      <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1">
        Save Signature
      </button>
    </div>
  );
};

export default SignaturePad;
