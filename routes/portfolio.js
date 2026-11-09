const express = require("express");
const Student = require("../models/Student");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

const allowedFields = ["name", "phone", "course", "bio", "education", "skills", "projects", "certificates"];

function validUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

router.get("/", requireAuth, (req, res) => {
  const student = req.student.toObject();
  delete student.password;
  res.json({ student });
});

router.put("/", requireAuth, async (req, res, next) => {
  try {
    const updates = {};
    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) updates[field] = req.body[field];
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid portfolio fields were supplied." });
    }
    if (updates.name !== undefined && (typeof updates.name !== "string" || updates.name.trim().length < 2 || updates.name.length > 80)) {
      return res.status(400).json({ message: "Name must be between 2 and 80 characters." });
    }
    if (updates.bio !== undefined && (typeof updates.bio !== "string" || updates.bio.length > 1000)) {
      return res.status(400).json({ message: "Bio must be 1,000 characters or fewer." });
    }
    if (updates.skills !== undefined && (!Array.isArray(updates.skills) || updates.skills.length > 40 || updates.skills.some(s => typeof s !== "string" || s.trim().length > 40))) {
      return res.status(400).json({ message: "Skills must be a list of up to 40 short text values." });
    }
    if (updates.projects !== undefined) {
      if (!Array.isArray(updates.projects) || updates.projects.length > 50 ||
          updates.projects.some(p => !p || typeof p.title !== "string" || !p.title.trim() || p.title.length > 100 || !validUrl(p.projectLink))) {
        return res.status(400).json({ message: "Check project titles and links. Links must use http:// or https://." });
      }
    }
    if (updates.education !== undefined && (!Array.isArray(updates.education) || updates.education.length > 30)) {
      return res.status(400).json({ message: "Education must be a list of up to 30 entries." });
    }
    if (updates.certificates !== undefined && (!Array.isArray(updates.certificates) || updates.certificates.length > 50 ||
        updates.certificates.some(c => !c || typeof c.title !== "string" || !c.title.trim()))) {
      return res.status(400).json({ message: "Each certificate needs a title." });
    }

    for (const field of ["name", "phone", "course", "bio"]) {
      if (typeof updates[field] === "string") updates[field] = updates[field].trim();
    }
    if (Array.isArray(updates.skills)) updates.skills = [...new Set(updates.skills.map(s => s.trim()).filter(Boolean))];

    Object.assign(req.student, updates);
    await req.student.save();

    const student = req.student.toObject();
    delete student.password;
    res.json({ message: "Portfolio saved successfully.", student });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: "Some portfolio details are invalid." });
    }
    next(error);
  }
});

module.exports = router;
