import { PointRecords } from '@users/infra/typeorm/entities/PointRecords';
import { instanceToInstance } from 'class-transformer';
import { UserMapper } from './UserMapper';

export class PointRecordMapper {
  static toDto({ id, user, time_registered }: PointRecords) {
    const pointRecord = instanceToInstance({
      id,
      user: UserMapper.toDto(user),
      time_registered,
    });

    return pointRecord;
  }
}
