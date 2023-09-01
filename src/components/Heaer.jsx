import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import logo from "../logo.jpg";
const Header = () => {
  return (
    <>
      <div className="header">
        <div className="">
          <img src={logo} className="logoo" />
        </div>
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
      </div>
    </>
  );
};

export default Header;
