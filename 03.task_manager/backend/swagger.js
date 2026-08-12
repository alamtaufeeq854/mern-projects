const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Task Manager API",
      version: "1.0.0",
      description: "REST API documentation for Task Manager",
    },

    servers: [
      {
        url: "http://localhost:8080",
        description: "Local Server",
      },
    ],

    tags: [
      {
        name: "Tasks",
        description: "Task management APIs",
      },
    ],

    components: {
      schemas: {
        Task: {
          type: "object",
          required: ["taskName", "isDone"],
          properties: {
            taskName: {
              type: "string",
              example: "Learn Swagger",
            },
            isDone: {
              type: "boolean",
              example: false,
            },
          },
        },

        TaskResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "All Tasks",
            },
            success: {
              type: "boolean",
              example: true,
            },
            tasks: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },

        SuccessResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Task is Created !",
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
              example: "Task not found",
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

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
