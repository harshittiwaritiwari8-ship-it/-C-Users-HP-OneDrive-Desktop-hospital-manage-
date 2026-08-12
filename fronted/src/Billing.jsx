import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Billing() {
  const [bills, setBills] = useState([]);

  const [patient, setPatient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");

  const loadBills = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bills");
      const data = await response.json();
      setBills(data);
    } catch (error) {
      console.log("Failed to load bills");
    }
  };

  useEffect(() => {
    loadBills();
  }, []);

  const addBill = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/bills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          patient,
          amount,
          status
        })
      });

      const data = await response.json();

      if (data.success) {
        alert("Bill added successfully!");

        setPatient("");
        setAmount("");
        setStatus("Pending");

        loadBills();
      }
    } catch (error) {
      alert("Backend connection failed");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <Link to="/dashboard">← Back to Dashboard</Link>

      <h1>💳 Billing</h1>

      <h2>➕ Add Bill</h2>

      <form onSubmit={addBill}>
        <input
          type="text"
          placeholder="Patient Name"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <br />
        <br />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
        </select>

        <br />
        <br />

        <button type="submit">
          ➕ Add Bill
        </button>
      </form>

      <hr />

      <h2>Total Bills: {bills.length}</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td>{bill.patient}</td>
              <td>₹{bill.amount}</td>
              <td>{bill.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Billing;