import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const loadPatients = async () => {
    const response = await fetch("http://localhost:5000/api/patients");
    const data = await response.json();
    setPatients(data);
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const addPatient = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        age,
        gender,
        phone
      })
    });

    const data = await response.json();

    if (data.success) {
      alert("Patient added successfully!");

      setName("");
      setAge("");
      setGender("");
      setPhone("");

      loadPatients();
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <Link to="/dashboard">← Back to Dashboard</Link>

      <h1>🧑 Patients</h1>

      <h2>Add Patient</h2>

      <form onSubmit={addPatient}>

        <input
          type="text"
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <br /><br />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

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
          ➕ Add Patient
        </button>

      </form>

      <hr />

      <h2>Total Patients: {patients.length}</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Patients;