import { useState, useEffect } from "react";
import Sell from "./components/sell";
import Input from "./components/input";
import Report from "./components/report";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WeeklyReport from "./components/WeekReport";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in by accessing local storage
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    // Clear user from state and local storage
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="week"
            element={
              user ? (
                <Home user={user} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="sell" element={<Sell />} />
          <Route
            path="input"
            element={
              user ? (
                <Input user={user} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="report"
            element={
              user ? (
                <Report user={user} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
          />
          <Route
            path="/"
            element={
              user ? (
                <Home user={user} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
      <h1></h1>
    </>
  );
}

export default App;
