const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Patient = require("./models/Patient");
const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");
const Bed = require("./models/Bed");
const Bill = require("./models/Bill");

const app = express();

app.use(cors());
app.use(express.json());



mongoose
  .connect("mongodb://127.0.0.1:27017/hospital_management")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });



app.get("/", (req, res) => {
  res.send("Hospital Management Backend is Running");
});



app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "admin123") {
    res.json({
      success: true,
      message: "Login successful"
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid email or password"
    });
  }
});



app.get("/api/patients", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get patients"
    });
  }
});

app.post("/api/patients", async (req, res) => {
  try {
    const { name, age, gender, phone } = req.body;

    const newPatient = new Patient({
      name,
      age,
      gender,
      phone
    });

    const savedPatient = await newPatient.save();

    res.json({
      success: true,
      patient: savedPatient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add patient"
    });
  }
});



app.get("/api/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get doctors"
    });
  }
});

app.post("/api/doctors", async (req, res) => {
  try {
    const { name, specialization, phone } = req.body;

    const newDoctor = new Doctor({
      name,
      specialization,
      phone
    });

    const savedDoctor = await newDoctor.save();

    res.json({
      success: true,
      doctor: savedDoctor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add doctor"
    });
  }
});



app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get appointments"
    });
  }
});

app.post("/api/appointments", async (req, res) => {
  try {
    const {
      patient,
      doctor,
      date,
      time,
      status
    } = req.body;

    const newAppointment = new Appointment({
      patient,
      doctor,
      date,
      time,
      status
    });

    const savedAppointment = await newAppointment.save();

    res.json({
      success: true,
      appointment: savedAppointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add appointment"
    });
  }
});



app.get("/api/beds", async (req, res) => {
  try {
    const beds = await Bed.find();
    res.json(beds);
  } catch (error) {
    console.log("BED ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get beds"
    });
  }
});

app.post("/api/beds", async (req, res) => {
  try {
    const {
      ward,
      bedNumber,
      status
    } = req.body;

    const newBed = new Bed({
      ward,
      bedNumber,
      status
    });

    const savedBed = await newBed.save();

    res.json({
      success: true,
      bed: savedBed
    });
  } catch (error) {
    console.log("BED ADD ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to add bed"
    });
  }
});




app.get("/api/bills", async (req, res) => {
  try {
    const bills = await Bill.find();

    res.json(bills);
  } catch (error) {
    console.log("BILL ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get bills"
    });
  }
});


app.post("/api/bills", async (req, res) => {
  try {
    const {
      patient,
      amount,
      status
    } = req.body;

    const newBill = new Bill({
      patient,
      amount,
      status
    });

    const savedBill = await newBill.save();

    res.json({
      success: true,
      bill: savedBill
    });
  } catch (error) {
    console.log("BILL ADD ERROR:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to add bill"
    });
  }
});



app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
