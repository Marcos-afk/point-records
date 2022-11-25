import { CreatePointRecordDto } from '@users/dtos/CreatePointRecordDto';
import { PointRecords } from '@users/infra/typeorm/entities/PointRecords';
import { PointRecordsRepositoryProps } from '@users/repositories/PointRecordsRepositoryProps';

export class PointRecordsRepositoryInMemory implements PointRecordsRepositoryProps {
  private pointsRecords: PointRecords[] = [];

  async create({ user_id }: CreatePointRecordDto): Promise<PointRecords> {
    const pointRecord = new PointRecords();
    Object.assign(pointRecord, {
      id: Math.floor(Math.random() * 10),
      user_id,
      time_registered: new Date(),
    });

    this.pointsRecords.push(pointRecord);
    return pointRecord;
  }
}
