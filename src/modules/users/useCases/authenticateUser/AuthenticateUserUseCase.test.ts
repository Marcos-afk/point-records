import { AppError } from '@shared/errors/AppError';
import { HashProvider } from '@shared/providers/HashProvider/HashProvider';
import { CreateUserDto } from '@users/dtos/CreateUserDto';
import { UsersRepositoryInMemory } from '@users/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let hashProvider: HashProvider;

describe('Authenticate user use case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    hashProvider = new HashProvider();
    createUserUseCase = new CreateUserUseCase(hashProvider, usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(hashProvider, usersRepositoryInMemory);
  });

  it('should be able to create a session for the user', async () => {
    const user: CreateUserDto = {
      name: 'usuário',
      email: 'teste@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
      role: 'colaborador',
    };

    const createdUser = await createUserUseCase.execute({ ...user });
    const session = await authenticateUserUseCase.execute({ email: createdUser.email, password: user.password });

    expect(session).toHaveProperty('token');
    expect(session).toHaveProperty('user');
  });

  it('should not be able to create session for user, invalid email', async () => {
    expect(authenticateUserUseCase.execute({ email: 'teste', password: '12345678' })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create session for user, invalid password', async () => {
    const user: CreateUserDto = {
      name: 'usuário',
      email: 'teste@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
      role: 'colaborador',
    };

    const createdUser = await createUserUseCase.execute({ ...user });
    expect(authenticateUserUseCase.execute({ email: createdUser.email, password: '123456789' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
