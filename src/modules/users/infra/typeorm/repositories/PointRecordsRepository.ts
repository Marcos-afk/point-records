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

  async create(createPointRecordDto: CreatePointRecordDto): Promise<PointRecords> {
    const pointRecord = this.pointRecords.create(createPointRecordDto);
    await this.pointRecords.save(pointRecord);

    return pointRecord;
  }
}
