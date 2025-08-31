import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";
export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      
      {user ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/cart">Cart</Link>
          {user.role === "ADMIN" && <Link to="/admin/members">Members</Link>}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
         
        </>
      )}
    </nav>
  );
}
