import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin";
import { asyncHandler, ApiError } from "../middleware/errorHandler";

/* LOGIN */
export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  console.log(`Admin login attempt: ${email}`);

  const admin = await Admin.findOne({ email });
  if (!admin) {
    console.log(`Admin login failed - user not found: ${email}`);
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    console.log(`Admin login failed - wrong password: ${email}`);
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { adminId: admin._id },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  console.log(`Admin login successful: ${email}`);
  res.json({ success: true, token });
});

