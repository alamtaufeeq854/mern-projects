const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Expense Tracker API",
      version: "1.0.0",
      description:
        "REST API documentation for Expense Tracker application",
    },

    servers: [
      {
        url: "http://localhost:8080",
        description: "Local Development Server",
      },
    ],

    tags: [
      {
        name: "Authentication",
        description: "Authentication related APIs",
      },
      {
        name: "Expenses",
        description: "Expense management APIs",
      },
      {
        name: "Products",
        description: "Product APIs",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        SignupRequest: {
          type: "object",
          required: ["name", "email", "password"],

          properties: {
            name: {
              type: "string",
              example: "Taufeeq Alam",
            },

            email: {
              type: "string",
              format: "email",
              example: "taufeeq@gmail.com",
            },

            password: {
              type: "string",
              format: "password",
              example: "Password@123",
            },
          },
        },

        LoginRequest: {
          type: "object",
          required: ["email", "password"],

          properties: {
            email: {
              type: "string",
              format: "email",
              example: "taufeeq@gmail.com",
            },

            password: {
              type: "string",
              format: "password",
              example: "Password@123",
            },
          },
        },

        AddExpenseRequest: {
          type: "object",

          properties: {
            name: {
              type: "string",
              example: "Food",
            },

            amount: {
              type: "number",
              example: 500,
            },

            category: {
              type: "string",
              example: "Food",
            },

            date: {
              type: "string",
              example: "2026-09-04",
            },
          },
        },

        Expense: {
          type: "object",

          properties: {
            _id: {
              type: "string",
              example: "68b9f8c123456789abcdef12",
            },

            name: {
              type: "string",
              example: "Food",
            },

            amount: {
              type: "number",
              example: 500,
            },

            category: {
              type: "string",
              example: "Food",
            },

            date: {
              type: "string",
              example: "2026-09-04",
            },
          },
        },

        ErrorResponse: {
          type: "object",

          properties: {
            message: {
              type: "string",
              example: "Something went wrong",
            },

            success: {
              type: "boolean",
              example: false,
            },
          },
        },
      },
    },
  },

  apis: ["./Routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;