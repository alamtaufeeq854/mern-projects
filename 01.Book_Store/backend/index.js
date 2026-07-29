import express from "express";
// import { PORT, mongoDB_URL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/bookRoutes.js";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5555;

// Middlewares
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Allow all origins
// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://book-store-frontend-osc9.onrender.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome to the Book store !");
});

app.use("/books", booksRoute);

mongoose
  .connect(process.env.mongoDB_URL)
  .then(() => {
    console.log(`MongoDB Connected `);

    app.listen(PORT, () => {
      console.log(`App is listening at PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDb Connection ${error}`);
  });
