import { CreateUserDto } from '@users/dtos/CreateUserDto';
import { User } from '@users/infra/typeorm/entities/User';
import { UsersRepositoryProps } from '@users/repositories/UsersRepositoryProps';

export class UsersRepositoryInMemory implements UsersRepositoryProps {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(u => u.email === email);
    if (user) {
      return user;
    }

    return null;
  }

  async create({ name, email, password, role }: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, {
      id: Math.floor(Math.random() * 10),
      name,
      email,
      password,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.users.push(user);
    return user;
  }
}
