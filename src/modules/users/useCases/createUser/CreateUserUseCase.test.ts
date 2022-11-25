import { HashProvider } from '@providers/HashProvider/HashProvider';
import { AppError } from '@shared/errors/AppError';
import { CreateUserDto } from '@users/dtos/CreateUserDto';
import { UsersRepositoryInMemory } from '@users/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './CreateUserUseCase';

let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let hashProvider: HashProvider;

describe('Create user use case', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    hashProvider = new HashProvider();
    createUserUseCase = new CreateUserUseCase(hashProvider, usersRepositoryInMemory);
  });

  it('should be able to create a new user', async () => {
    const user: CreateUserDto = {
      name: 'usuário',
      email: 'teste@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
      role: 'colaborador',
    };

    const createdUser = await createUserUseCase.execute({ ...user });

    expect(createdUser).toHaveProperty('id');
    expect(createdUser).toHaveProperty('createdAt');
  });

  it('should not be able to create user, user email already exists', async () => {
    const user: CreateUserDto = {
      name: 'usuário',
      email: 'teste@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
      role: 'colaborador',
    };

    const secondUser: CreateUserDto = {
      name: 'usuário 2',
      email: 'teste@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
      role: 'administrador',
    };

    await createUserUseCase.execute({ ...user });
    expect(createUserUseCase.execute({ ...secondUser })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create user, passwords do not match', async () => {
    const user: CreateUserDto = {
      name: 'usuário',
      email: 'teste@gmail.com',
      password: '123456789',
      confirmPassword: '12345678',
      role: 'colaborador',
    };

    expect(createUserUseCase.execute({ ...user })).rejects.toBeInstanceOf(AppError);
  });
});
