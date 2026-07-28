import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Book Store API",
    description: "Book Store REST API Documentation",
  },
  host: "localhost:5555",
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/bookRoutes.js"];

swaggerAutogen()(outputFile, routes, doc);
