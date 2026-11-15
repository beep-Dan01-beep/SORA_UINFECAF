import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import userRoutes from "./modules/users/user.routes";
import taskRoutes from "./modules/tasks/task.routes";
import reminderRoutes from "./modules/reminders/reminder.routes";
import chatbotRoutes from "./modules/chatbot/chatbot.routes";
import intelligenceRoutes from "./modules/intelligence/intelligence.routes";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => res.json({ status: "ok", service: "SORA API" }));
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/chat", chatbotRoutes);
app.use("/api/intelligence", intelligenceRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((_req, res) => res.status(404).json({ error: "Rota não encontrada." }));
app.use(errorHandler);

export default app;
