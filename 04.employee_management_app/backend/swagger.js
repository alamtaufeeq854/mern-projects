const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Employee Management API",
      version: "1.0.0",
      description: "API documentation for Employee Management System",
    },

    servers: [
      {
        url: "http://localhost:8080",
        description: "Local Server",
      },
      {
        url: "https://employee-management-backend-k970.onrender.com",
        description: "Production Server",
      },
    ],
  },

  apis: ["./Routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
