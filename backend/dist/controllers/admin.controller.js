"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = adminLogin;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
/* LOGIN */
async function adminLogin(req, res) {
    const { email, password } = req.body;
    const admin = await Admin_1.default.findOne({ email });
    if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcryptjs_1.default.compare(password, admin.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jsonwebtoken_1.default.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
}
