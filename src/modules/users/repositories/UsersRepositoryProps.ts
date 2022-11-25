import { CreateUserDto } from '@users/dtos/CreateUserDto';
import { User } from '@users/infra/typeorm/entities/User';

export interface UsersRepositoryProps {
  findByEmail(email: string): Promise<User | null>;
  create(createUserDto: CreateUserDto): Promise<User>;
}
