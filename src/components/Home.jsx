import React from "react";
import Header from "./Heaer";
import "./Home.css";
import logo from "../logo.jpg";
const Home = () => {
  return (
    <>
      <Header />
      <div className="wrapper">
        <img src={logo} />
        <h1>
          Welcome to
          <br />
          NATEES Garment
          <br />
          Store system
        </h1>
      </div>
    </>
  );
};

export default Home;
