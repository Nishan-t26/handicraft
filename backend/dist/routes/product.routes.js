"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const multer_1 = __importDefault(require("../lib/multer"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", product_controller_1.getProducts);
router.get("/:id", product_controller_1.getProductById);
router.post("/", auth_1.protect, multer_1.default.single("image"), product_controller_1.createProduct);
router.put("/:id", auth_1.protect, multer_1.default.single("image"), product_controller_1.updateProduct);
router.delete("/:id", auth_1.protect, product_controller_1.deleteProduct);
exports.default = router;
