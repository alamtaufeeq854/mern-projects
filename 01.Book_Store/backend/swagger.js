import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Store API",
      version: "1.0.0",
      description: "REST API for Book Store",
    },
    servers: [
      {
        url: "http://localhost:5555",
        description: "Local Server",
      },
      {
        url: "https://mern-projects-nlm9.onrender.com",
        description: "Production Server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
