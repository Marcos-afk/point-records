import { User } from '@users/infra/typeorm/entities/User';
import { instanceToInstance } from 'class-transformer';

export class UserMapper {
  static toDto({ id, name, email, role }: User) {
    const user = instanceToInstance({
      id,
      name,
      email,
      role,
    });

    return user;
  }
}
