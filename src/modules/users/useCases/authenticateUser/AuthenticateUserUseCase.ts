import { sign } from 'jsonwebtoken';
import { HashProviderProps } from '@providers/HashProvider/HashProviderProps';
import { AppError } from '@shared/errors/AppError';
import { AuthenticateUserDto } from '@users/dtos/AuthenticateUseDto';
import { UsersRepositoryProps } from '@users/repositories/UsersRepositoryProps';
import { inject, injectable } from 'tsyringe';
import { authConfig } from '@config/auth';
import { UserMapper } from '@users/mapper/UserMapper';

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('HashProvider') private hashProvider: HashProviderProps,
    @inject('UsersRepository') private usersRepository: UsersRepositoryProps,
  ) {}

  public async execute({ email, password }: AuthenticateUserDto) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email ou senha incorreto');
    }

    const passwordIsValid = await this.hashProvider.compare(password, user.password);
    if (!passwordIsValid) {
      throw new AppError('Email ou senha incorreto');
    }

    const token = sign({}, authConfig.secret_token as string, {
      subject: String(user.id),
      expiresIn: authConfig.expires_in_token,
    });

    const formattedUser = UserMapper.dto(user);

    return { user: formattedUser, token };
  }
}
