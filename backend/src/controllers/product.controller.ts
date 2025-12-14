import { Request, Response } from "express";
import Product from "../models/Product";
import cloudinary from "../lib/cloudinary";
import { asyncHandler, ApiError } from "../middleware/errorHandler";

/* CREATE */
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, price } = req.body;
  const file = req.file;

  if (!name || !price) {
    throw new ApiError(400, "Name and price are required");
  }

  if (!file) {
    throw new ApiError(400, "Image is required");
  }

  console.log(`Creating product: ${name}`);

  const uploadResult = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    { folder: "products" }
  );

  const product = await Product.create({
    name,
    price,
    images: [uploadResult.secure_url],
  });

  console.log(`Product created successfully: ${product._id}`);
  res.status(201).json({ success: true, data: product });
});

/* READ ALL */
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
  console.log(`Fetched ${products.length} products`);
  res.json({ success: true, data: products });
});

/* READ ONE */
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  res.json({ success: true, data: product });
});

/* UPDATE */
export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, price } = req.body;
  const file = req.file;

  const existingProduct = await Product.findById(req.params.id);
  if (!existingProduct) {
    throw new ApiError(404, "Product not found");
  }

  const updateData: any = { name, price };

  if (file) {
    console.log(`Uploading new image for product: ${req.params.id}`);
    const uploadResult = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      { folder: "products" }
    );
    updateData.images = [uploadResult.secure_url];
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  console.log(`Product updated successfully: ${req.params.id}`);
  res.json({ success: true, data: product });
});

/* DELETE */
export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  await Product.findByIdAndDelete(req.params.id);
  console.log(`Product deleted: ${req.params.id}`);
  res.json({ success: true, message: "Product deleted" });
});

