import { AppSource } from '@shared/infra/typeorm';
import { CreatePointRecordDto } from '@users/dtos/CreatePointRecordDto';
import { UserMapper } from '@users/mapper/UserMapper';
import { PointRecordsRepositoryProps } from '@users/repositories/PointRecordsRepositoryProps';
import { Repository } from 'typeorm';
import { PointRecords } from '../entities/PointRecords';
import { UsersRepository } from './UsersRepository';

export class PointRecordsRepository implements PointRecordsRepositoryProps {
  private pointRecords: Repository<PointRecords>;

  constructor() {
    this.pointRecords = AppSource.getRepository(PointRecords);
  }

  async find(): Promise<PointRecords[]> {
    return await this.pointRecords
      .createQueryBuilder('point_records')
      .leftJoin('point_records.user', 'users')
      .addSelect(['users.name', 'users.email', 'users.role'])
      .getMany();
  }

  async create(createPointRecordDto: CreatePointRecordDto): Promise<PointRecords> {
    const pointRecord = this.pointRecords.create(createPointRecordDto);
    const usersRepository = new UsersRepository();
    await this.pointRecords.save(pointRecord);
    const user = await usersRepository.findById(pointRecord.user_id);
    if (user) {
      pointRecord.user = UserMapper.dto(user);
    }

    return pointRecord;
  }
}
