import React, { useEffect, useState } from "react";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [beds, setBeds] = useState([]);
  const [bills, setBills] = useState([]);

  const loadData = async () => {
    try {
      const [
        patientsRes,
        doctorsRes,
        appointmentsRes,
        bedsRes,
        billsRes
      ] = await Promise.all([
        fetch("http://localhost:5000/api/patients"),
        fetch("http://localhost:5000/api/doctors"),
        fetch("http://localhost:5000/api/appointments"),
        fetch("http://localhost:5000/api/beds"),
        fetch("http://localhost:5000/api/bills")
      ]);

      setPatients(await patientsRes.json());
      setDoctors(await doctorsRes.json());
      setAppointments(await appointmentsRes.json());
      setBeds(await bedsRes.json());
      setBills(await billsRes.json());
    } catch (error) {
      console.log("Dashboard error:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const availableBeds = beds.filter(
    (bed) => bed.status?.toLowerCase() === "available"
  ).length;

  const occupiedBeds = beds.filter(
    (bed) => bed.status?.toLowerCase() === "occupied"
  ).length;

  const totalBilling = bills.reduce(
    (total, bill) => total + Number(bill.amount || 0),
    0
  );

  const confirmedAppointments = appointments.filter(
    (appointment) =>
      appointment.status?.toLowerCase() === "confirmed"
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fb",
        padding: "30px",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* HEADER */}

      <div
        style={{
          background: "white",
          padding: "25px 30px",
          borderRadius: "15px",
          marginBottom: "25px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
        }}
      >
        <h1 style={{ margin: 0 }}>
          🏥 Hospital Management System
        </h1>

        <p style={{ color: "#666", marginBottom: 0 }}>
          Welcome to your hospital administration dashboard
        </p>
      </div>

      {/* STAT CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "20px"
        }}
      >
        {/* PATIENTS */}

        <div style={cardStyle}>
          <div style={iconStyle}>🧑‍🤝‍🧑</div>

          <div>
            <p style={labelStyle}>Total Patients</p>

            <h2 style={numberStyle}>
              {patients.length}
            </h2>

            <p style={smallStyle}>
              Registered patients
            </p>
          </div>
        </div>

        {/* DOCTORS */}

        <div style={cardStyle}>
          <div style={iconStyle}>👨‍⚕️</div>

          <div>
            <p style={labelStyle}>Total Doctors</p>

            <h2 style={numberStyle}>
              {doctors.length}
            </h2>

            <p style={smallStyle}>
              Medical staff
            </p>
          </div>
        </div>

        {/* APPOINTMENTS */}

        <div style={cardStyle}>
          <div style={iconStyle}>📅</div>

          <div>
            <p style={labelStyle}>Appointments</p>

            <h2 style={numberStyle}>
              {appointments.length}
            </h2>

            <p style={smallStyle}>
              {confirmedAppointments} confirmed
            </p>
          </div>
        </div>

        {/* BEDS */}

        <div style={cardStyle}>
          <div style={iconStyle}>🛏️</div>

          <div>
            <p style={labelStyle}>Available Beds</p>

            <h2 style={numberStyle}>
              {availableBeds}
            </h2>

            <p style={smallStyle}>
              {occupiedBeds} occupied
            </p>
          </div>
        </div>

        {/* BILLING */}

        <div style={cardStyle}>
          <div style={iconStyle}>💰</div>

          <div>
            <p style={labelStyle}>Total Billing</p>

            <h2 style={numberStyle}>
              ₹{totalBilling.toLocaleString()}
            </h2>

            <p style={smallStyle}>
              All bills
            </p>
          </div>
        </div>
      </div>

      {/* LOWER SECTION */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginTop: "25px"
        }}
      >

        {/* QUICK OVERVIEW */}

        <div style={sectionStyle}>
          <h2>📊 Hospital Overview</h2>

          <div style={rowStyle}>
            <span>Patients</span>
            <strong>{patients.length}</strong>
          </div>

          <div style={rowStyle}>
            <span>Doctors</span>
            <strong>{doctors.length}</strong>
          </div>

          <div style={rowStyle}>
            <span>Appointments</span>
            <strong>{appointments.length}</strong>
          </div>

          <div style={rowStyle}>
            <span>Available Beds</span>
            <strong>{availableBeds}</strong>
          </div>

          <div style={rowStyle}>
            <span>Occupied Beds</span>
            <strong>{occupiedBeds}</strong>
          </div>
        </div>

        {/* RECENT APPOINTMENTS */}

        <div style={sectionStyle}>
          <h2>📅 Recent Appointments</h2>

          {appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            appointments
              .slice(-5)
              .reverse()
              .map((appointment, index) => (
                <div
                  key={appointment._id || index}
                  style={{
                    padding: "12px 0",
                    borderBottom:
                      "1px solid #eee"
                  }}
                >
                  <strong>
                    {appointment.patient}
                  </strong>

                  <p
                    style={{
                      margin: "5px 0",
                      color: "#666"
                    }}
                  >
                    {appointment.doctor}
                  </p>

                  <small>
                    {appointment.date} •{" "}
                    {appointment.time}
                  </small>
                </div>
              ))
          )}
        </div>
      </div>

      {/* REFRESH */}

      <button
        onClick={loadData}
        style={{
          marginTop: "25px",
          padding: "12px 22px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          background: "#2563eb",
          color: "white",
          fontSize: "15px"
        }}
      >
        🔄 Refresh Dashboard
      </button>
    </div>
  );
}

/* ==================== STYLES ==================== */

const cardStyle = {
  background: "white",
  padding: "22px",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  gap: "18px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.07)"
};

const iconStyle = {
  fontSize: "35px"
};

const labelStyle = {
  margin: 0,
  color: "#666"
};

const numberStyle = {
  margin: "5px 0",
  fontSize: "30px"
};

const smallStyle = {
  margin: 0,
  color: "#888",
  fontSize: "13px"
};

const sectionStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.07)"
};

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "14px 0",
  borderBottom: "1px solid #eee"
};

export default Dashboard;