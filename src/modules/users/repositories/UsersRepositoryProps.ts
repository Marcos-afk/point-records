import { CreateUserDto } from '@users/dtos/CreateUserDto';
import { User } from '@users/infra/typeorm/entities/User';

export interface UsersRepositoryProps {
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findUsersAdmin(): Promise<User[]>;
  create(createUserDto: CreateUserDto): Promise<User>;
}
