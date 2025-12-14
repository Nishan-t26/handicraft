import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin";

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI!);

  const email = "admin@handicraft.com";
  const password = "admin123";

  const exists = await Admin.findOne({ email });
  if (exists) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await Admin.create({ email, password: hashedPassword });

  console.log("Admin created");
  process.exit();
}

seedAdmin();
