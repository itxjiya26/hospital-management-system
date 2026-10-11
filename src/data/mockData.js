export const mockDepartments = [
  {
    id: "dept-1",
    name: "Cardiology & Cardiac ICU",
    code: "CARD-01",
    totalBeds: 25,
    availableBeds: 4,
    icuAvailable: 1,
    leadDoctor: "Dr. Sarah Khan",
    equipment: ["Ventilator", "ECG", "Defibrillator"],
    description: "Specialized unit for acute cardiac care and emergency heart surgeries."
  },
  {
    id: "dept-2",
    name: "Neurology & Stroke Unit",
    code: "NEUR-02",
    totalBeds: 20,
    availableBeds: 2,
    icuAvailable: 0,
    leadDoctor: "Dr. Ahmed Raza",
    equipment: ["MRI Access", "CT Scan", "EEG Monitor"],
    description: "Emergency care for ischemic strokes, brain injuries, and neuro-surgery recovery."
  },
  {
    id: "dept-3",
    name: "Pediatric Emergency",
    code: "PED-03",
    totalBeds: 15,
    availableBeds: 6,
    icuAvailable: 2,
    leadDoctor: "Dr. Ayesha Malik",
    equipment: ["Pediatric Incubators", "Oxygen Concentrator"],
    description: "Dedicated emergency unit for neonates and pediatric intensive care."
  }
];