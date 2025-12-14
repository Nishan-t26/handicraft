"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Admin_1 = __importDefault(require("../models/Admin"));
async function seedAdmin() {
    await mongoose_1.default.connect(process.env.MONGO_URI);
    const email = "admin@handicraft.com";
    const password = "admin123";
    const exists = await Admin_1.default.findOne({ email });
    if (exists) {
        console.log("Admin already exists");
        process.exit();
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    await Admin_1.default.create({ email, password: hashedPassword });
    console.log("Admin created");
    process.exit();
}
seedAdmin();
