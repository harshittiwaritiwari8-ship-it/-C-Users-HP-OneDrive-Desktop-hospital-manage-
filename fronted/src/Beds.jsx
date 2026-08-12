import React, { useEffect, useState } from "react";

function Beds() {
  const [beds, setBeds] = useState([]);
  const [ward, setWard] = useState("");
  const [bedNumber, setBedNumber] = useState("");
  const [status, setStatus] = useState("Available");

  const loadBeds = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/beds");

      if (!response.ok) {
        throw new Error("Failed to load beds");
      }

      const data = await response.json();
      setBeds(data);
    } catch (error) {
      console.error("Error loading beds:", error);
    }
  };

  useEffect(() => {
    loadBeds();
  }, []);

  const addBed = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/beds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ward,
          bedNumber,
          status
        })
      });

      const data = await response.json();

      if (data.success) {
        setWard("");
        setBedNumber("");
        setStatus("Available");

        loadBeds();
      }
    } catch (error) {
      console.error("Error adding bed:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛏️ Beds</h1>

      <form onSubmit={addBed} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Ward"
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Bed Number"
          value={bedNumber}
          onChange={(e) => setBedNumber(e.target.value)}
          required
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Available">Available</option>
          <option value="Occupied">Occupied</option>
        </select>

        <button type="submit">Add Bed</button>
      </form>

      <h2>Bed List</h2>

      {beds.length === 0 ? (
        <p>No beds found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Ward</th>
              <th>Bed Number</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {beds.map((bed) => (
              <tr key={bed._id}>
                <td>{bed.ward}</td>
                <td>{bed.bedNumber}</td>
                <td>{bed.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Beds;