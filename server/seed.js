// Force Node.js to use Google's Public DNS servers to resolve MongoDB Atlas SRV records
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const mongoose = require("mongoose");
const Department = require("./models/Department");

const sampleDepartments = [
  {
    name: "Cardiology",
    code: "CARD",
    description: "Specialized cardiovascular care and cardiac surgeries.",
    leadDoctor: "Dr. Sarah Jenkins",
    totalBeds: 25,
    availableBeds: 8,
    equipment: ["ECG", "Echocardiogram", "Defibrillator"]
  },
  {
    name: "Neurology",
    code: "NEUR",
    description: "Brain, spine, and nervous system diagnostics and treatment.",
    leadDoctor: "Dr. Robert Vance",
    totalBeds: 18,
    availableBeds: 4,
    equipment: ["MRI Scanner", "EEG Monitor"]
  },
  {
    name: "Pediatrics",
    code: "PED",
    description: "Comprehensive medical care for infants, children, and adolescents.",
    leadDoctor: "Dr. Elena Rostova",
    totalBeds: 30,
    availableBeds: 12,
    equipment: ["Incubators", "Pediatric Ventilators"]
  },
  {
    name: "Emergency",
    code: "EMERG",
    description: "24/7 urgent critical care and trauma unit.",
    leadDoctor: "Dr. Marcus Thorne",
    totalBeds: 40,
    availableBeds: 2,
    equipment: ["Trauma Kit", "Defibrillator", "Portable X-Ray"]
  }
];

mongoose
  .connect(process.env.MONGODB_URI, { family: 4 })
  .then(async () => {
    console.log("Connected to MongoDB Atlas for seeding...");
    await Department.deleteMany({});
    await Department.insertMany(sampleDepartments);
    console.log("Departments seeded successfully!");
    process.exit();
  })
  .catch((err) => {
    console.error("Seeding error:", err.message);
    process.exit(1);
  });