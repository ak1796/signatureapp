import React from "react";
import { Routes, Route } from "react-router-dom";
import Upload from "./pages/Upload";
import Viewer from "./pages/Viewer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/viewer" element={<Viewer />} />
      </Routes>
    </>
  );
};

export default App;
