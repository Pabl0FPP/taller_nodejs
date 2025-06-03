import mongoose from "mongoose";
import dotenv from "dotenv"; 

dotenv.config();

const connectionString = process.env.MONGO_URI || "";

if (!connectionString) {
  throw new Error("❌ MONGO_URI no está definido en el archivo .env");
}

export const db = mongoose.connect(connectionString)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
