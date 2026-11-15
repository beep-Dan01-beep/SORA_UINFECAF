import { prisma } from "../../database/prisma";
import { CreateUserDTO, UpdateUserDTO, User } from "./user.types";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: number, data: UpdateUserDTO): Promise<User | null>;
  delete(id: number): Promise<boolean>;
}

export class UserRepository implements IUserRepository {
  findAll(): Promise<User[]> {
    return prisma.user.findMany({ orderBy: { id: "asc" } }) as Promise<User[]>;
  }

  findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } }) as Promise<User | null>;
  }

  create(data: CreateUserDTO): Promise<User> {
    return prisma.user.create({ data }) as Promise<User>;
  }

  async update(id: number, data: UpdateUserDTO): Promise<User | null> {
    const exists = await prisma.user.findUnique({ where: { id }, select: { id: true } });
    if (!exists) return null;
    return prisma.user.update({ where: { id }, data }) as Promise<User>;
  }

  async delete(id: number): Promise<boolean> {
    const result = await prisma.user.deleteMany({ where: { id } });
    return result.count > 0;
  }
}
