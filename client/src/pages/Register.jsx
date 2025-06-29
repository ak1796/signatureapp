import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", form);
      alert("Registered successfully");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Name" onChange={handleChange} className="w-full border p-2" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full border p-2" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full border p-2" />
        <button className="bg-green-600 text-white px-4 py-2">Register</button>
      </form>
    </div>
  );
};

export default Register;
