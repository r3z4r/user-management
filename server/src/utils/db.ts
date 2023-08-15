const mongoose = require("mongoose");
require("dotenv").config();

let isConnected = false;

module.exports = async () => {
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
