import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function protect(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    console.log("Auth failed: No bearer token provided");
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    next();
  } catch (error) {
    console.log("Auth failed: Invalid token");
    res.status(401).json({ success: false, message: "Invalid token" });
  }
}

