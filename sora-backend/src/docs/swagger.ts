import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SORA API",
      version: "1.0.0",
      description: "API RESTful da assistente doméstica SORA."
    },
    servers: [{ url: "http://localhost:3000", description: "Ambiente local" }],
    components: {
      schemas: {
        UserInput: {
          type: "object",
          required: ["name", "email"],
          properties: {
            name: { type: "string", example: "Daniel" },
            email: { type: "string", example: "daniel@email.com" }
          }
        },
        TaskInput: {
          type: "object",
          required: ["user_id", "title"],
          properties: {
            user_id: { type: "integer", example: 1 },
            title: { type: "string", example: "Organizar a cozinha" },
            description: { type: "string" },
            status: { type: "string", enum: ["pending", "in_progress", "completed"] },
            due_at: { type: "string", format: "date-time", nullable: true }
          }
        },
        ReminderInput: {
          type: "object",
          required: ["user_id", "title", "remind_at"],
          properties: {
            user_id: { type: "integer", example: 1 },
            title: { type: "string", example: "Regar as plantas" },
            message: { type: "string" },
            remind_at: { type: "string", format: "date-time" },
            completed: { type: "boolean" }
          }
        }
      }
    }
  },
  apis: ["./src/modules/**/*.ts"]
});
