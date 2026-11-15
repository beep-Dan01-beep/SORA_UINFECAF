import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";

export class UserController {
  constructor(private readonly service: UserService) {}

  findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try { res.json(await this.service.findAll()); } catch (e) { next(e); }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try { res.json(await this.service.findById(Number(req.params.id))); } catch (e) { next(e); }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try { res.status(201).json(await this.service.create(req.body)); } catch (e) { next(e); }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try { res.json(await this.service.update(Number(req.params.id), req.body)); } catch (e) { next(e); }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try { await this.service.delete(Number(req.params.id)); res.status(204).send(); } catch (e) { next(e); }
  };
}
