const express = require("express");

require("dotenv").config();
require("./Models/db");

const cors = require("cors");

const TaskRoute = require("./Routes/TaskRouter");
const bodyParser = require("body-parser");

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swagger.js");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

app.use(cors());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Hello From the server...");
});

app.use("/task", TaskRoute);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
