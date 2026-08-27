const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const AuthRouter = require("./Routes/AuthRouter.js");
const ProductRouter = require("./Routes/ProductRouter.js");
const swaggerSpec = require("./swagger.js");

const app = express();

require("dotenv").config();
require("./Models/db.js");

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 8080;

/**
 * @swagger
 * /PING:
 *   get:
 *     summary: Check server status
 *     description: Returns PONG when the server is running.
 *     tags:
 *       - Health
 *
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           text/plain:
 *             example: PONG
 */
app.get("/PING", (req, res) => {
  res.send("PONG");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
