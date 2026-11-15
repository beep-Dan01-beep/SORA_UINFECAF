import { Router } from "express";
import { UserRepository } from "../users/user.repository";
import { TaskRepository } from "./task.repository";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";

const router = Router();
const controller = new TaskController(
  new TaskService(new TaskRepository(), new UserRepository())
);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
export default router;
