import { AppError } from "../../middlewares/error-handler";
import { IUserRepository } from "../users/user.repository";
import { CreateTaskDTO, TaskStatus, UpdateTaskDTO } from "./task.types";
import { ITaskRepository } from "./task.repository";

const statuses: TaskStatus[] = ["pending", "in_progress", "completed"];

export class TaskService {
  constructor(
    private readonly repository: ITaskRepository,
    private readonly users: IUserRepository
  ) {}

  findAll(userId?: number) {
    return this.repository.findAll(userId);
  }

  async findById(id: number) {
    const task = await this.repository.findById(id);
    if (!task) throw new AppError("Tarefa não encontrada.", 404);
    return task;
  }

  async create(data: CreateTaskDTO) {
    if (!Number.isInteger(data.user_id) || !data.title?.trim()) {
      throw new AppError("user_id e título são obrigatórios.");
    }
    if (data.status && !statuses.includes(data.status)) {
      throw new AppError("Status inválido.");
    }
    await this.users.findById(data.user_id);
    return this.repository.create({ ...data, title: data.title.trim() });
  }

  async update(id: number, data: UpdateTaskDTO) {
    if (data.title !== undefined && !data.title.trim()) throw new AppError("Título não pode ficar vazio.");
    if (data.status && !statuses.includes(data.status)) throw new AppError("Status inválido.");
    const task = await this.repository.update(id, {
      ...data,
      title: data.title?.trim()
    });
    if (!task) throw new AppError("Tarefa não encontrada.", 404);
    return task;
  }

  async delete(id: number) {
    if (!(await this.repository.delete(id))) throw new AppError("Tarefa não encontrada.", 404);
  }
}
