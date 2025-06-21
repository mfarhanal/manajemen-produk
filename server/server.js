import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import testRouter from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// testing routes
app.use("/api/test", testRouter);
app.get("/", (req, res) => {
  res.send("Welcome to Products Management App");
});

// API Endpoint
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`🌐Server running in http://localhost:${port}`);
});
