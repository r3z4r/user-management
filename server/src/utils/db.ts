const mongoose = require("mongoose");
require("dotenv").config();
export {};
let isConnected = false;

const connectToDB = async () => {
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

module.exports = connectToDB;
