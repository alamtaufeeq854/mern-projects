import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ThinkBoard API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:5001",
      },
    ],
    components: {
      schemas: {
        CreateNote: {
          type: "object",
          required: ["title", "content"],
          properties: {
            title: {
              type: "string",
              minLength: 1,
              maxLength: 100,
              example: "Learn Swagger",
            },
            content: {
              type: "string",
              minLength: 1,
              example: "Swagger helps document REST APIs.",
            },
          },
        },

        Note: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "68903d71f3d9a8d95d1f8c1d",
            },
            title: {
              type: "string",
              example: "Learn Swagger",
            },
            content: {
              type: "string",
              example: "Professional API Documentation",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2026-08-04T12:20:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2026-08-04T12:35:00Z",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
