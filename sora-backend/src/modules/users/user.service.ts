import { AppError } from "../../middlewares/error-handler";
import { CreateUserDTO, UpdateUserDTO } from "./user.types";
import { IUserRepository } from "./user.repository";

export class UserService {
  constructor(private readonly repository: IUserRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findById(id: number) {
    const user = await this.repository.findById(id);
    if (!user) throw new AppError("Usuário não encontrado.", 404);
    return user;
  }

  create(data: CreateUserDTO) {
    if (!data.name?.trim() || !data.email?.trim()) {
      throw new AppError("Nome e e-mail são obrigatórios.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new AppError("Informe um e-mail válido.");
    }
    return this.repository.create({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase()
    });
  }

  async update(id: number, data: UpdateUserDTO) {
    if (data.name !== undefined && !data.name.trim()) {
      throw new AppError("O nome não pode ficar vazio.");
    }
    if (data.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new AppError("Informe um e-mail válido.");
    }
    const user = await this.repository.update(id, {
      ...data,
      name: data.name?.trim(),
      email: data.email?.trim().toLowerCase()
    });
    if (!user) throw new AppError("Usuário não encontrado.", 404);
    return user;
  }

  async delete(id: number) {
    const deleted = await this.repository.delete(id);
    if (!deleted) throw new AppError("Usuário não encontrado.", 404);
  }
}
