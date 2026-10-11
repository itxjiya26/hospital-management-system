const express = require("express");
const router = express.Router();
const Department = require("../models/Department");

// GET All Departments
router.get("/", async (req, res, next) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    next(error);
  }
});

// GET Single Department by Mongo _id or Code
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    
    let department;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      department = await Department.findById(id);
    } else {
      department = await Department.findOne({ code: id.toUpperCase() });
    }

    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json(department);
  } catch (error) {
    next(error);
  }
});

// POST Create Department
router.post("/", async (req, res, next) => {
  try {
    const newDepartment = new Department(req.body);
    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Validation Error", details: error.message });
    }
    next(error);
  }
});

// 🌟 PUT Update Department (Added to fix the modal save error)
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ error: "Department not found to update" });
    }

    res.status(200).json(updatedDepartment);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Validation Error", details: error.message });
    }
    next(error);
  }
});

// DELETE Department
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedDepartment = await Department.findByIdAndDelete(id);

    if (!deletedDepartment) {
      return res.status(404).json({ error: "Department not found to delete" });
    }

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;