const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const { connectToDB } = require("./Models/db.js");
const EmployeeRoutes = require("./Routes/EmployeeRoutes.js");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

connectToDB();

const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://employee-management-jwrv.onrender.com",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working",
  });
});

app.use("/api/employees", EmployeeRoutes);

app.get("/", (req, res) => {
  res.send("Employee Management server is running !");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`PORT is running at: ${PORT}`);
});
