import { AppError } from '@shared/errors/AppError';
import { FindPointRecordByUser } from '@users/dtos/FindPointRecordByUserDto';
import { PointRecordsRepositoryProps } from '@users/repositories/PointRecordsRepositoryProps';
import { UsersRepositoryProps } from '@users/repositories/UsersRepositoryProps';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindPointRecordsByUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepositoryProps,
    @inject('PointRecordsRepository') private pointRecordsRepository: PointRecordsRepositoryProps,
  ) {}

  public async execute({ user_id }: FindPointRecordByUser) {
    const isExistingUser = await this.usersRepository.findById(user_id);
    if (!isExistingUser) {
      throw new AppError('Usuário não encontrado', 404);
    }

    return await this.pointRecordsRepository.findPointRecordsByUser(user_id);
  }
}
