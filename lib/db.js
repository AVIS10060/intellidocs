import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export const connectDB = async () => {
  if (isConnected) {
    // If already connected, do nothing
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "intellidocs",
    });

    isConnected = db.connections[0].readyState === 1;

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Error:", error);
  }
};
