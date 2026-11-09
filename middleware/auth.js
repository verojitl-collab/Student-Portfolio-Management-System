const Student = require("../models/Student");

async function requireAuth(req, res, next) {
  try {
    if (!req.session.studentId) {
      return res.status(401).json({ message: "Please log in to continue." });
    }
    const student = await Student.findById(req.session.studentId);
    if (!student) {
      req.session.destroy(() => {});
      return res.status(401).json({ message: "Your account could not be found. Please log in again." });
    }
    req.student = student;
    next();
  } catch (error) {
    next(error);
  }
}

function requireAdmin(req, res, next) {
  if (!req.student || req.student.role !== "admin") {
    return res.status(403).json({ message: "Administrator access required." });
  }
  next();
}

module.exports = { requireAuth, requireAdmin };
