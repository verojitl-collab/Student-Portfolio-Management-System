const express = require("express");
const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

function publicStudent(student) {
  return {
    id: student._id,
    name: student.name,
    email: student.email,
    role: student.role,
    phone: student.phone,
    course: student.course,
    bio: student.bio,
    education: student.education,
    skills: student.skills,
    projects: student.projects,
    certificates: student.certificates,
    createdAt: student.createdAt
  };
}

router.post("/register", async (req, res, next) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");

    if (name.length < 2 || name.length > 80) {
      return res.status(400).json({ message: "Name must be between 2 and 80 characters." });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Enter a valid email address." });
    }
    if (password.length < 8 || password.length > 72) {
      return res.status(400).json({ message: "Password must be 8–72 characters long." });
    }
    if (await Student.exists({ email })) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const student = await Student.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
      role: "student"
    });

    req.session.studentId = student._id.toString();
    res.status(201).json({ message: "Account created successfully.", student: publicStudent(student) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "Email is already registered." });
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = String(req.body.password || "");
    const student = await Student.findOne({ email }).select("+password");

    if (!student || !(await bcrypt.compare(password, student.password))) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    req.session.regenerate((err) => {
      if (err) return next(err);
      req.session.studentId = student._id.toString();
      res.json({ message: "Login successful.", student: publicStudent(student) });
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ student: publicStudent(req.student) });
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.clearCookie("studentPortfolio.sid", { httpOnly: true, sameSite: "lax" });
    res.json({ message: "Logged out successfully." });
  });
});

module.exports = router;
