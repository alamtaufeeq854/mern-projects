const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "MERN Authentication API",
      version: "1.0.0",
      description: "Complete API documentation for the MERN Authentication",
    },

    servers: [
      {
        url: "http://localhost:8080",
        description: "Local Development Server",
      },
    ],

    tags: [
      {
        name: "Health",
        description: "Server health check APIs",
      },
      {
        name: "Authentication",
        description: "User signup and login APIs",
      },
      {
        name: "Products",
        description: "Protected product APIs",
      },
    ],

    components: {
      securitySchemes: {
        JWTAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description:
            "Enter the JWT token directly. Example: eyJhbGciOiJIUzI1NiIs...",
        },
      },

      schemas: {
        SignupRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              minLength: 3,
              maxLength: 100,
              example: "Taufeeq Alam",
            },

            email: {
              type: "string",
              format: "email",
              example: "taufeeq@gmail.com",
            },

            password: {
              type: "string",
              minLength: 4,
              maxLength: 100,
              format: "password",
              example: "Password123",
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
              minLength: 4,
              maxLength: 100,
              format: "password",
              example: "Password123",
            },
          },
        },

        SuccessResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Operation Successfully!",
            },

            success: {
              type: "boolean",
              example: true,
            },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal Server Error",
            },

            success: {
              type: "boolean",
              example: false,
            },
          },
        },

        Product: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "T.V",
            },

            price: {
              type: "string",
              example: "50000",
            },
          },
        },
      },
    },
  },

  apis: ["./Routes/*.js", "./Controllers/*.js", "./index.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
