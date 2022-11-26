import { PointRecordsRepositoryProps } from '@users/repositories/PointRecordsRepositoryProps';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListPointRecordsUseCase {
  constructor(@inject('PointRecordsRepository') private pointRecordsRepository: PointRecordsRepositoryProps) {}

  public async execute() {
    return await this.pointRecordsRepository.find();
  }
}
