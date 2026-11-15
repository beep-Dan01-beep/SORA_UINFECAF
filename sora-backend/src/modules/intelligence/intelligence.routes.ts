import { Router } from "express";
import { IntelligenceController } from "./intelligence.controller";
import { IntelligenceService } from "./intelligence.service";

const router = Router();
const controller = new IntelligenceController(new IntelligenceService());
router.post("/classify-task", controller.classify);
export default router;
