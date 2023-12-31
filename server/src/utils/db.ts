import mongoose from "mongoose";
import "dotenv/config";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("mongodb already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "users",
    });
    isConnected = true;
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};

export const disconnectMongo = async () => {
  await mongoose.disconnect();
  isConnected = false;
  console.log("mongodb disconnected");
};
