import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FindPointRecordsByUserUseCase } from './FindPointRecordsByUserUseCase';

export class FindPointRecordByUserController {
  public async handle(req: Request, res: Response) {
    const { id } = req.user;

    const findPointRecordsByUserUseCase = container.resolve(FindPointRecordsByUserUseCase);
    const pointRecords = await findPointRecordsByUserUseCase.execute({ user_id: id });

    return res.status(200).json({ message: 'Lista de registro de pontos do usuário!', pointRecords });
  }
}
