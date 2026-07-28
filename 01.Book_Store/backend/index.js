import express from "express";
import { PORT, mongoDB_URL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/bookRoutes.js";

const app = express();

// Middlewares
app.use(express.json());

// Allow all origins
// app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "Content-Type",
  }),
);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Welcome to the Book store !");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log(`MongoDB Connected `);

    app.listen(PORT, () => {
      console.log(`App is listening at PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDb Connection ${error}`);
  });
