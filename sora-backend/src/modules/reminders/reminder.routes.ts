import { Router } from "express";
import { UserRepository } from "../users/user.repository";
import { ReminderRepository } from "./reminder.repository";
import { ReminderService } from "./reminder.service";
import { ReminderController } from "./reminder.controller";

const router = Router();
const controller = new ReminderController(
  new ReminderService(new ReminderRepository(), new UserRepository())
);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
export default router;
