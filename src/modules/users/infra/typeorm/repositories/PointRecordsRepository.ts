import { AppSource } from '@shared/infra/typeorm';
import { CreatePointRecordDto } from '@users/dtos/CreatePointRecordDto';
import { PointRecordsRepositoryProps } from '@users/repositories/PointRecordsRepositoryProps';
import { Repository } from 'typeorm';
import { PointRecords } from '../entities/PointRecords';

export class PointRecordsRepository implements PointRecordsRepositoryProps {
  private pointRecords: Repository<PointRecords>;

  constructor() {
    this.pointRecords = AppSource.getRepository(PointRecords);
  }

  async find(): Promise<PointRecords[]> {
    return await this.pointRecords
      .createQueryBuilder('point_records')
      .leftJoin('point_records.user', 'users')
      .addSelect(['users.id', 'users.name', 'users.email', 'users.role'])
      .getMany();
  }

  async findPointRecordsByUser(user_id: number): Promise<PointRecords[]> {
    return await this.pointRecords
      .createQueryBuilder('point_records')
      .where('point_records.user_id = :id', { id: user_id })
      .leftJoin('point_records.user', 'users')
      .addSelect(['users.id', 'users.name', 'users.email', 'users.role'])
      .getMany();
  }

  async create(createPointRecordDto: CreatePointRecordDto): Promise<PointRecords> {
    const pointRecord = this.pointRecords.create(createPointRecordDto);
    await this.pointRecords.save(pointRecord);

    return pointRecord;
  }
}
