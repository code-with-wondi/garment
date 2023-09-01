import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="logo"></div>
        <div className="links">
          <Link to="/" className="lin">
            <p>Home</p>
          </Link>
          <Link to="/input" className="lin">
            <p>Input</p>
          </Link>
          <Link to="/sell" className="lin">
            <p>Output</p>
          </Link>
          <Link to="/report" className="lin">
            <p>Report</p>
          </Link>
        </div>
        <Link to="/week" className="lin">
          <p>Week report</p>
        </Link>
        <div className="logout">
          <p>Week report</p>
        </div>
      </div>
    </>
  );
};

export default Header;
