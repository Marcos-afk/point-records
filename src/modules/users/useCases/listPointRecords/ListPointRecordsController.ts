import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListPointRecordsUseCase } from './ListPointRecordsUseCase';

export class ListPointRecordsController {
  public async handle(req: Request, res: Response) {
    const listPointRecords = container.resolve(ListPointRecordsUseCase);

    const pointRecords = await listPointRecords.execute();

    return res.status(200).json({ message: 'Lista de registro de pontos!', pointRecords });
  }
}
