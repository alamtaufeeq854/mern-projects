const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const { connectToDB } = require("./Models/db.js");
const EmployeeRoutes = require("./Routes/EmployeeRoutes.js");
const cors = require("cors");

const app = express();

connectToDB();

const PORT = process.env.PORT || 8080;

app.use(cors());

app.use(bodyParser.json());

app.use("/api/employees", EmployeeRoutes);

app.get("/", (req, res) => {
  res.send("Employee Management server is running !");
});

app.listen(PORT, () => {
  console.log(`PORT is running at: ${PORT}`);
});
