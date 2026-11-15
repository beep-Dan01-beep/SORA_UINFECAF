import { Request, Response, NextFunction } from "express";
import { AppError } from "../../middlewares/error-handler";
import { IntelligenceService } from "./intelligence.service";

export class IntelligenceController {
  constructor(private readonly service: IntelligenceService) {}
  classify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (typeof req.body.description !== "string") {
        throw new AppError("Envie description como texto.");
      }
      res.json(await this.service.classifyTask(req.body.description));
    } catch (e) { next(e); }
  };
}
