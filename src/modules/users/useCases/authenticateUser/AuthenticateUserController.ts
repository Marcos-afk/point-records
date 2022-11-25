import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  public async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const response = await authenticateUserUseCase.execute({ email, password });

    return res.status(200).json({ message: 'Login realizado com sucesso!', response });
  }
}
