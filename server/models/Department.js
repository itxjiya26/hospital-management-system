const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Department code is required"],
      unique: true,
      trim: true,
      uppercase: true,
      minlength: [2, "Code must be at least 2 characters"],
      maxlength: [10, "Code cannot exceed 10 characters"]
    },
    name: {
      type: String,
      required: [true, "Department name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"]
    },
    leadDoctor: {
      type: String,
      required: [true, "Lead doctor name is required"],
      trim: true,
      default: "Unassigned"
    },
    availableBeds: {
      type: Number,
      required: [true, "Available beds count is required"],
      min: [0, "Available beds cannot be negative"],
      max: [500, "Maximum bed capacity exceeded"],
      default: 0
    },
    icuAvailable: {
      type: Number,
      required: [true, "ICU availability count is required"],
      min: [0, "ICU count cannot be negative"],
      max: [100, "Maximum ICU capacity exceeded"],
      default: 0
    },
    status: {
      type: String,
      enum: {
        values: ["Active", "Maintenance", "Full"],
        message: "{VALUE} is not a valid status"
      },
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Department", departmentSchema);