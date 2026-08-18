import 'dotenv/config'
import express from "express";
import cors from 'cors'
import  mongoose from "mongoose";
import  ideaRoutes from"./routes/ideaRoutes.js";
import  authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/ideas", ideaRoutes);

app.get("/", (req, res) => {
  res.send("Idea Tracker API is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  })
  .finally(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });
