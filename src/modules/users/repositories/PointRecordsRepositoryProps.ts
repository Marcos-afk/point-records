import { CreatePointRecordDto } from '@users/dtos/CreatePointRecordDto';
import { PointRecords } from '@users/infra/typeorm/entities/PointRecords';

export interface PointRecordsRepositoryProps {
  find(): Promise<PointRecords[]>;
  findPointRecordsByUser(user_id: number): Promise<PointRecords[]>;
  create(createPointRecordDto: CreatePointRecordDto): Promise<PointRecords>;
}
