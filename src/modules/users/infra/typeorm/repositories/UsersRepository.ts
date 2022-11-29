import { AppSource } from '@shared/infra/typeorm';
import { CreateUserDto } from '@users/dtos/CreateUserDto';
import { UsersRepositoryProps } from '@users/repositories/UsersRepositoryProps';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

export class UsersRepository implements UsersRepositoryProps {
  private users: Repository<User>;
  constructor() {
    this.users = AppSource.getRepository(User);
  }

  async findById(id: number): Promise<User | null> {
    return await this.users.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.users.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.users.create(createUserDto);
    await this.users.save(user);

    return user;
  }
}
