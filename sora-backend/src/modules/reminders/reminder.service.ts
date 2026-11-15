import { AppError } from "../../middlewares/error-handler";
import { IUserRepository } from "../users/user.repository";
import { IReminderRepository } from "./reminder.repository";
import { CreateReminderDTO, UpdateReminderDTO } from "./reminder.types";

export class ReminderService {
  constructor(
    private readonly repository: IReminderRepository,
    private readonly users: IUserRepository
  ) {}
  findAll(userId?: number) { return this.repository.findAll(userId); }
  async findById(id: number) {
    const reminder = await this.repository.findById(id);
    if (!reminder) throw new AppError("Lembrete não encontrado.", 404);
    return reminder;
  }
  async create(data: CreateReminderDTO) {
    if (!Number.isInteger(data.user_id) || !data.title?.trim() || !data.remind_at) {
      throw new AppError("user_id, título e data do lembrete são obrigatórios.");
    }
    if (Number.isNaN(Date.parse(data.remind_at))) throw new AppError("Data do lembrete inválida.");
    await this.users.findById(data.user_id);
    return this.repository.create({ ...data, title: data.title.trim() });
  }
  async update(id: number, data: UpdateReminderDTO) {
    if (data.title !== undefined && !data.title.trim()) throw new AppError("Título não pode ficar vazio.");
    if (data.remind_at !== undefined && Number.isNaN(Date.parse(data.remind_at))) {
      throw new AppError("Data do lembrete inválida.");
    }
    const reminder = await this.repository.update(id, {
      ...data, title: data.title?.trim()
    });
    if (!reminder) throw new AppError("Lembrete não encontrado.", 404);
    return reminder;
  }
  async delete(id: number) {
    if (!(await this.repository.delete(id))) throw new AppError("Lembrete não encontrado.", 404);
  }
}
