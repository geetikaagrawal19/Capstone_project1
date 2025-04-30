import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // <-- import Link and useLocation
import "./Header.css";
//import { Link } from "react-router-dom";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    navigate("/session-over") // Later you can replace this with actual logout logic
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/images/logo.jpg" alt="Logo" className="logo-image" />
      </div>

      <nav className="nav-links">
        {/* Home Link */}
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Home
        </Link>

        {/* Tutorial Link */}
        <Link
          to="/tutorial"
          className={`nav-link ${location.pathname === "/tutorial" ? "active" : ""}`}
        >
          Tutorial
        </Link>

        {/* Contact Link */}
        <Link
          to="/contacts"
          className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
        >
          Contact Us
        </Link>

        {/* History Link */}
        <Link
          to="/history"
          className={`nav-link ${location.pathname === "/history" ? "active" : ""}`}
        >
          History
        </Link>
      </nav>

      <div className="profile-container">
        <div className="profile-icon" onClick={toggleDropdown}>
          <img src="/images/profile.png" alt="Profile" className="profile-image" />
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="username">Hello, User</div>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
