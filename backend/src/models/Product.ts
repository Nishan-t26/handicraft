import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model("Product", ProductSchema);
