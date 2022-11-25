import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../errors/AppError';
import { UsersRepository } from '@users/infra/typeorm/repositories/UsersRepository';
import { authConfig } from '@config/auth';

interface TokenPayloadProps {
  sub: string;
}

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const usersRepository = new UsersRepository();
  if (!authHeader) {
    throw new AppError('Sem token', 404);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.secret_token as string);
    const { sub } = decodeToken as TokenPayloadProps;

    const user = await usersRepository.findById(Number(sub));
    if (!user) {
      throw new AppError('Token inválido', 401);
    }

    req.user = {
      id: Number(sub),
    };

    return next();
  } catch {
    throw new AppError('Token inválido', 401);
  }
};
