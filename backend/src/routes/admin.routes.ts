import { Router } from "express";
import { adminLogin } from "../controllers/admin.controller";
import { loginLimiter } from "../middleware/security";

const router = Router();

router.post("/login", loginLimiter, adminLogin);

export default router;
