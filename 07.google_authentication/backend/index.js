const express = require("express");
const app = express();
require("dotenv").config();
require("./models/dbConnection.js");
const authRouter = require("./routes/authRouter.js");
const cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello ! From  Auth Server !");
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
