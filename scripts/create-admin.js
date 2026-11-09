require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Student = require("../models/Student");

async function main() {
  const { MONGO_URI, ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Set ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD in your .env file first.");
  }
  if (ADMIN_PASSWORD.length < 12) {
    throw new Error("For the admin account, use a password of at least 12 characters.");
  }

  await mongoose.connect(MONGO_URI || "mongodb://127.0.0.1:27017/studentPortfolioDB");
  const email = ADMIN_EMAIL.toLowerCase().trim();
  const existing = await Student.findOne({ email });

  if (existing) {
    existing.name = ADMIN_NAME;
    existing.role = "admin";
    existing.password = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await existing.save();
    console.log("Existing account updated as administrator.");
  } else {
    await Student.create({
      name: ADMIN_NAME,
      email,
      password: await bcrypt.hash(ADMIN_PASSWORD, 12),
      role: "admin"
    });
    console.log("Administrator account created.");
  }
  await mongoose.disconnect();
}

main().catch(async error => {
  console.error(error.message);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
