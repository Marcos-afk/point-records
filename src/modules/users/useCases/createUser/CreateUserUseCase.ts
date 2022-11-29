import { HashProviderProps } from '@providers/HashProvider/HashProviderProps';
import { AppError } from '@shared/errors/AppError';
import { CreateUserDto } from '@users/dtos/CreateUserDto';
import { UserMapper } from '@users/mapper/UserMapper';
import { UsersRepositoryProps } from '@users/repositories/UsersRepositoryProps';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('HashProvider') private hashProvider: HashProviderProps,
    @inject('UsersRepository') private usersRepository: UsersRepositoryProps,
  ) {}

  public async execute({ name, email, password, confirmPassword, role }: CreateUserDto) {
    const isExistingEmail = await this.usersRepository.findByEmail(email);
    if (isExistingEmail) {
      throw new AppError('Email inválido');
    }

    if (password !== confirmPassword) {
      throw new AppError('Senhas não conferem');
    }

    const hashPassword = await this.hashProvider.hash(password);
    const user = await this.usersRepository.create({ name, email, password: hashPassword, role });

    const formattedUser = UserMapper.toDto(user);
    return formattedUser;
  }
}
