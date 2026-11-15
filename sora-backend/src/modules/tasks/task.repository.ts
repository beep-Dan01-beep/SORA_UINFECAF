import { prisma } from "../../database/prisma";
import { CreateTaskDTO, Task, UpdateTaskDTO } from "./task.types";

export interface ITaskRepository {
  findAll(userId?: number): Promise<Task[]>;
  findById(id: number): Promise<Task | null>;
  create(data: CreateTaskDTO): Promise<Task>;
  update(id: number, data: UpdateTaskDTO): Promise<Task | null>;
  delete(id: number): Promise<boolean>;
}

export class TaskRepository implements ITaskRepository {
  findAll(userId?: number): Promise<Task[]> {
    return prisma.task.findMany({
      where: userId === undefined ? undefined : { user_id: userId },
      orderBy: { id: "asc" }
    }) as Promise<Task[]>;
  }

  findById(id: number): Promise<Task | null> {
    return prisma.task.findUnique({ where: { id } }) as Promise<Task | null>;
  }

  create(data: CreateTaskDTO): Promise<Task> {
    return prisma.task.create({
      data: {
        user_id: data.user_id,
        title: data.title,
        description: data.description ?? null,
        status: data.status ?? "pending",
        due_at: data.due_at ? new Date(data.due_at) : null
      }
    }) as Promise<Task>;
  }

  async update(id: number, data: UpdateTaskDTO): Promise<Task | null> {
    const exists = await prisma.task.findUnique({ where: { id }, select: { id: true } });
    if (!exists) return null;
    return prisma.task.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.description !== undefined ? { description: data.description } : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        ...(data.due_at !== undefined ? { due_at: data.due_at ? new Date(data.due_at) : null } : {})
      }
    }) as Promise<Task>;
  }

  async delete(id: number): Promise<boolean> {
    const result = await prisma.task.deleteMany({ where: { id } });
    return result.count > 0;
  }
}
