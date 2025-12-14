"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
const Product_1 = __importDefault(require("../models/Product"));
const cloudinary_1 = __importDefault(require("../lib/cloudinary"));
/* CREATE */
async function createProduct(req, res) {
    const { name, price } = req.body;
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "Image is required" });
    }
    const uploadResult = await cloudinary_1.default.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`, { folder: "products" });
    const product = await Product_1.default.create({
        name,
        price,
        images: [uploadResult.secure_url],
    });
    res.status(201).json(product);
}
/* READ ALL */
async function getProducts(req, res) {
    const products = await Product_1.default.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(products);
}
/* READ ONE */
async function getProductById(req, res) {
    const product = await Product_1.default.findById(req.params.id);
    res.json(product);
}
/* UPDATE */
async function updateProduct(req, res) {
    const { name, price } = req.body;
    const file = req.file;
    const updateData = { name, price };
    if (file) {
        const uploadResult = await cloudinary_1.default.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`, { folder: "products" });
        updateData.images = [uploadResult.secure_url];
    }
    const product = await Product_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(product);
}
/* DELETE */
async function deleteProduct(req, res) {
    await Product_1.default.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
}
