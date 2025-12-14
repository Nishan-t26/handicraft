import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes";
import adminRoutes from "./routes/admin.routes";
import { requestLogger, errorHandler } from "./middleware/errorHandler";

const app = express();

// Request logging
app.use(requestLogger);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// Global error handler (must be last)
app.use(errorHandler);

export default app;

