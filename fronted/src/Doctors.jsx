import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [phone, setPhone] = useState("");

  const loadDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctors");
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.log("Failed to load doctors");
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const addDoctor = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          specialization,
          phone
        })
      });

      const data = await response.json();

      if (data.success) {
        alert("Doctor added successfully!");

        setName("");
        setSpecialization("");
        setPhone("");

        loadDoctors();
      }
    } catch (error) {
      alert("Backend connection failed");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <Link to="/dashboard">← Back to Dashboard</Link>

      <h1>👨‍⚕️ Doctors</h1>

      <h2>Add Doctor</h2>

      <form onSubmit={addDoctor}>
        <input
          type="text"
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">
          ➕ Add Doctor
        </button>
      </form>

      <hr />

      <h2>Total Doctors: {doctors.length}</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialization</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;