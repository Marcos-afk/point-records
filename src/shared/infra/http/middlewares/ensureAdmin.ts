import { AppError } from '@shared/errors/AppError';
import { UsersRepository } from '@users/infra/typeorm/repositories/UsersRepository';
import { NextFunction, Request, Response } from 'express';

export const ensureAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user) {
    throw new AppError('Usuário não encontrado', 404);
  }

  if (user.role.toLowerCase() !== 'administrador' && user.role.toLowerCase() !== 'admin') {
    throw new AppError('Acesso negado', 403);
  }

  return next();
};
