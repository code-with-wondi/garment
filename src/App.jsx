import { useState } from "react";
import Sell from "./components/sell";
import Input from "./components/input";
import Report from "./components/report";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeeklyReport from "./components/WeekReport";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="week" element={<WeeklyReport />} />
          <Route path="sell" element={<Sell />} />
          <Route path="input" element={<Input />} />
          <Route path="/login" element={<Login />} />
          <Route path="report" element={<Report />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <h1></h1>
    </>
  );
}

export default App;
