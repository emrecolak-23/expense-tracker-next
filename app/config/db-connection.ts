import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "");
    console.log("Connected to the database");
  } catch (err) {
    console.log(err);
  }
};
