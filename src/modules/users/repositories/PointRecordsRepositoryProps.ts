import { CreatePointRecordDto } from '@users/dtos/CreatePointRecordDto';
import { PointRecords } from '@users/infra/typeorm/entities/PointRecords';

export interface PointRecordsRepositoryProps {
  create(createPointRecordDto: CreatePointRecordDto): Promise<PointRecords>;
}
