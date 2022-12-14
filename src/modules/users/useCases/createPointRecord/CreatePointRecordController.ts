import { io } from '@shared/infra/http/app';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreatePointRecordUseCase } from './CreatePointRecordUseCase';

export class CreatePointRecordController {
  public async handle(req: Request, res: Response) {
    const { id } = req.user;

    const createPointRecordUseCase = container.resolve(CreatePointRecordUseCase);
    const recordPoint = await createPointRecordUseCase.execute({ user_id: id });

    io.emit('created_point', recordPoint);
    return res.status(201).json({ message: 'Ponto registrado com sucesso!', point: recordPoint });
  }
}
