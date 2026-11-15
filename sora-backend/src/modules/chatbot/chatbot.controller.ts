import { Request, Response, NextFunction } from "express";
import { AppError } from "../../middlewares/error-handler";
import { ChatbotService } from "./chatbot.service";

export class ChatbotController {
  constructor(private readonly service: ChatbotService) {}
  ask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req.body.message !== "string") throw new AppError("Envie message como texto.");
      const answer = await this.service.ask(req.body.message);
      res.json({ assistant: "SORA", answer });
    } catch (e) { next(e); }
  };
}
