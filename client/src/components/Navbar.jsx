import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">SignatureApp</h1>
      <div className="space-x-4">
        <Link to="/">Dashboard</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
