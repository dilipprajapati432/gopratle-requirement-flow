import cors from "cors";
import express from "express";
import requirementRoutes from "./routes/requirementRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",").map((value) => value.trim()) || "*"
  })
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "GoPratle API is running"
  });
});

app.use("/api/requirements", requirementRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

app.use(errorHandler);

export default app;
