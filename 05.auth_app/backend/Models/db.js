const mongoose = require("mongoose");

const mono_url = process.env.MONGO_URL;

mongoose
  .connect(mono_url)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error", err);
  });
