import { prisma } from "../../database/prisma";
import { CreateReminderDTO, Reminder, UpdateReminderDTO } from "./reminder.types";

export interface IReminderRepository {
  findAll(userId?: number): Promise<Reminder[]>;
  findById(id: number): Promise<Reminder | null>;
  create(data: CreateReminderDTO): Promise<Reminder>;
  update(id: number, data: UpdateReminderDTO): Promise<Reminder | null>;
  delete(id: number): Promise<boolean>;
}

export class ReminderRepository implements IReminderRepository {
  findAll(userId?: number): Promise<Reminder[]> {
    return prisma.reminder.findMany({
      where: userId === undefined ? undefined : { user_id: userId },
      orderBy: { remind_at: "asc" }
    }) as Promise<Reminder[]>;
  }

  findById(id: number): Promise<Reminder | null> {
    return prisma.reminder.findUnique({ where: { id } }) as Promise<Reminder | null>;
  }

  create(data: CreateReminderDTO): Promise<Reminder> {
    return prisma.reminder.create({
      data: {
        user_id: data.user_id,
        title: data.title,
        message: data.message ?? null,
        remind_at: new Date(data.remind_at),
        completed: data.completed ?? false
      }
    }) as Promise<Reminder>;
  }

  async update(id: number, data: UpdateReminderDTO): Promise<Reminder | null> {
    const exists = await prisma.reminder.findUnique({ where: { id }, select: { id: true } });
    if (!exists) return null;
    return prisma.reminder.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.message !== undefined ? { message: data.message } : {}),
        ...(data.remind_at !== undefined ? { remind_at: new Date(data.remind_at) } : {}),
        ...(data.completed !== undefined ? { completed: data.completed } : {})
      }
    }) as Promise<Reminder>;
  }

  async delete(id: number): Promise<boolean> {
    const result = await prisma.reminder.deleteMany({ where: { id } });
    return result.count > 0;
  }
}
