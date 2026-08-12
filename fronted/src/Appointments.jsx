import { Link } from "react-router-dom";

function Appointments() {
  const appointments = [
    {
      id: 1,
      patient: "Rahul Kumar",
      doctor: "Dr. Rahul Sharma",
      date: "12 August 2026",
      time: "10:00 AM",
      status: "Confirmed"
    },
    {
      id: 2,
      patient: "Anjali Verma",
      doctor: "Dr. Priya Singh",
      date: "12 August 2026",
      time: "11:30 AM",
      status: "Pending"
    }
  ];

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>

      <Link to="/dashboard">← Back to Dashboard</Link>

      <h1>📅 Appointments</h1>

      <h2>Total Appointments: {appointments.length}</h2>

      <table
        border="1"
        cellPadding="12"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px"
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.id}</td>
              <td>{appointment.patient}</td>
              <td>{appointment.doctor}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Appointments;