const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const AuthRouter = require("./Routes/AuthRouter.js");
const ProductRouter = require("./Routes/ProductRouter.js");
const ExpenseRouter = require("./Routes/ExpenseRouter.js");
const ensureAuthentication = require("./Middlewares/Auth.js");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

require("dotenv").config();
require("./Models/db.js");

app.use(bodyParser.json());
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/expenses", ensureAuthentication, ExpenseRouter);

const PORT = process.env.PORT || 8080;

app.get("/PING", (req, res) => {
  res.send("PONG");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
