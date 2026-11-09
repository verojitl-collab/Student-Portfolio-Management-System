const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  institution: { type: String, trim: true, maxlength: 120 },
  qualification: { type: String, trim: true, maxlength: 100 },
  year: { type: Number, min: 1950, max: 2100 },
  grade: { type: String, trim: true, maxlength: 30 }
}, { _id: true });

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, trim: true, maxlength: 1000 },
  technologies: [{ type: String, trim: true, maxlength: 40 }],
  projectLink: { type: String, trim: true, maxlength: 300 }
}, { _id: true });

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  issuer: { type: String, trim: true, maxlength: 120 },
  year: { type: Number, min: 1950, max: 2100 }
}, { _id: true });

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 80 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  phone: { type: String, trim: true, maxlength: 20, default: "" },
  course: { type: String, trim: true, maxlength: 100, default: "" },
  bio: { type: String, trim: true, maxlength: 1000, default: "" },
  education: { type: [educationSchema], default: [] },
  skills: { type: [String], default: [] },
  projects: { type: [projectSchema], default: [] },
  certificates: { type: [certificateSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
