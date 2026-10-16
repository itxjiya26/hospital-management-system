const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// POST: Book a new appointment (Patient)
router.post("/", async (req, res) => {
  try {
    const { patientName, patientEmail, department, doctorName, appointmentDate, appointmentTime, reason } = req.body;
    
    const newAppointment = new Appointment({
      patientName,
      patientEmail,
      department,
      doctorName,
      appointmentDate,
      appointmentTime,
      reason
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (err) {
    res.status(500).json({ error: "Failed to book appointment", details: err.message });
  }
});

// GET: Fetch all appointments (Doctor / Staff / Admin)
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

// PUT: Update status (Doctor marks as Completed/Cancelled)
router.put("/:id", async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (err) {
    res.status(500).json({ error: "Failed to update appointment status" });
  }
});

module.exports = router;