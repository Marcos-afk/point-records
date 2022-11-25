import { User } from '@users/infra/typeorm/entities/User';
import { instanceToInstance } from 'class-transformer';

export class UserMapper {
  static dto({ id, name, email, role, createdAt, updatedAt }: User) {
    const user = instanceToInstance({
      id,
      name,
      email,
      role,
      createdAt,
      updatedAt,
    });

    return user;
  }
}
