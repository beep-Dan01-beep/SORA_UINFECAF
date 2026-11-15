import { Router } from "express";
import { ChatbotController } from "./chatbot.controller";
import { ChatbotService } from "./chatbot.service";

const router = Router();
const controller = new ChatbotController(new ChatbotService());
router.post("/", controller.ask);
export default router;
