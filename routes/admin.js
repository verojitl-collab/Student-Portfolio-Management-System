const express = require("express");
const Student = require("../models/Student");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get("/students", async (req, res, next) => {
  try {
    const q = String(req.query.q || "").trim();
    const filter = { role: "student" };
    if (q) {
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { name: { $regex: escaped, $options: "i" } },
        { email: { $regex: escaped, $options: "i" } },
        { course: { $regex: escaped, $options: "i" } }
      ];
    }
    const students = await Student.find(filter)
      .select("name email course skills projects certificates createdAt")
      .sort({ createdAt: -1 })
      .limit(200);
    res.json({ students });
  } catch (error) {
    next(error);
  }
});

router.delete("/students/:id", async (req, res, next) => {
  try {
    const deleted = await Student.findOneAndDelete({ _id: req.params.id, role: "student" });
    if (!deleted) return res.status(404).json({ message: "Student not found." });
    res.json({ message: "Student account deleted." });
  } catch (error) {
    if (error.name === "CastError") return res.status(400).json({ message: "Invalid student ID." });
    next(error);
  }
});

module.exports = router;
