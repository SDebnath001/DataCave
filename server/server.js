import dotenv from "dotenv";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import messageRoutes from "./routes/messageroutes.js";

dotenv.config();
console.log("ENV CHECK:", process.env.MONGO_URI);

const app = express();
connectDB();
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/messages", messageRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});