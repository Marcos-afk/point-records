import { AppError } from '@shared/errors/AppError';
import { CreatePointRecordDto } from '@users/dtos/CreatePointRecordDto';
import { PointRecordsRepositoryProps } from '@users/repositories/PointRecordsRepositoryProps';
import { UsersRepositoryProps } from '@users/repositories/UsersRepositoryProps';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreatePointRecordUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepositoryProps,
    @inject('PointRecordsRepository') private pointRecordsRepository: PointRecordsRepositoryProps,
  ) {}

  public async execute({ user_id }: CreatePointRecordDto) {
    const isExistingUser = await this.usersRepository.findById(user_id);
    if (!isExistingUser) {
      throw new AppError('Usuário não encontrado', 404);
    }

    return await this.pointRecordsRepository.create({ user_id });
  }
}
