import { UsersRepositoryProps } from '@users/repositories/UsersRepositoryProps';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ListUsersAdminUseCase {
  constructor(@inject('UsersRepository') private usersRepository: UsersRepositoryProps) {}

  public async execute() {
    return await this.usersRepository.findUsersAdmin();
  }
}
