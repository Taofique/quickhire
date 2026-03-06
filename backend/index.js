import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/connectDB.js";
import jobRoutes from "./routes/jobs.route.js";
import applicationRoutes from "./routes/applications.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});
