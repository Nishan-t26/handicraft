import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin";
import { validatePassword } from "../middleware/security";

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  // Validate environment variables
  if (!email || !password) {
    console.error("❌ Error: ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env file");
    console.log("\nExample:");
    console.log("  ADMIN_EMAIL=admin@yourcompany.com");
    console.log("  ADMIN_PASSWORD=YourSecurePassword123!");
    process.exit(1);
  }

  // Validate password strength
  const passwordCheck = validatePassword(password);
  if (!passwordCheck.valid) {
    console.error(`❌ Weak password: ${passwordCheck.message}`);
    console.log("\nPassword requirements:");
    console.log("  - At least 8 characters");
    console.log("  - At least one uppercase letter (A-Z)");
    console.log("  - At least one lowercase letter (a-z)");
    console.log("  - At least one number (0-9)");
    console.log("  - At least one special character (!@#$%^&*...)");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI!);

  const exists = await Admin.findOne({ email });
  if (exists) {
    console.log("⚠️  Admin already exists with this email");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash(password, 12); // Increased from 10 to 12 rounds
  await Admin.create({ email, password: hashedPassword });

  console.log("✅ Admin created successfully!");
  console.log(`   Email: ${email}`);
  process.exit();
}

seedAdmin();
