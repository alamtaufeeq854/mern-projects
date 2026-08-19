const mongoose = require("mongoose");

const DB_URL = process.env.MONGODB_URL;

const connectToDB = () => {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("MONGODB Connected...");
    })
    .catch((err) => {
      console.log("MONGODB Connection Error", err);
    });
};

module.exports = { connectToDB };
