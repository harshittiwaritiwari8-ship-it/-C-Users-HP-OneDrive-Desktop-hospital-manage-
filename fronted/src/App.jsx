import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import Patients from "./Patients";
import Doctors from "./Doctors";
import Appointments from "./Appointments";
import Beds from "./Beds";
import Billing from "./Billing";

function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      {/* SIDEBAR */}

      <div
        style={{
          width: "230px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
          boxSizing: "border-box"
        }}
      >
        <h2>🏥 Hospital</h2>

        <p style={{ color: "#94a3b8" }}>
          Management System
        </p>

        <nav style={{ marginTop: "30px" }}>

          <Link to="/dashboard" style={linkStyle}>
            🏠 Dashboard
          </Link>

          <Link to="/patients" style={linkStyle}>
            🧑‍🤝‍🧑 Patients
          </Link>

          <Link to="/doctors" style={linkStyle}>
            👨‍⚕️ Doctors
          </Link>

          <Link to="/appointments" style={linkStyle}>
            📅 Appointments
          </Link>

          <Link to="/beds" style={linkStyle}>
            🛏️ Beds
          </Link>

          <Link to="/billing" style={linkStyle}>
            💰 Billing
          </Link>

          <Link to="/" style={linkStyle}>
            🚪 Logout
          </Link>

        </nav>
      </div>

      {/* PAGE CONTENT */}

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/beds" element={<Beds />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </div>

    </div>
  );
}

const linkStyle = {
  display: "block",
  color: "white",
  textDecoration: "none",
  padding: "14px 10px",
  marginBottom: "5px",
  borderRadius: "7px"
};

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route path="/" element={<Login />} />

        {/* MAIN APPLICATION */}

        <Route path="/*" element={<Layout />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;