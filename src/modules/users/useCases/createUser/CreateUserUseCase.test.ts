import { HashProvider } from '@providers/HashProvider/HashProvider';
import { AppError } from '@shared/errors/AppError';
import { UsersRepositoryInMemory } from '@users/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from './CreateUserUseCase';
import { mock } from './mock';

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
    const createdUser = await createUserUseCase.execute({ ...mock[0] });

    expect(createdUser).toHaveProperty('id');
  });

  it('should not be able to create user, user email already exists', async () => {
    await createUserUseCase.execute({ ...mock[0] });
    expect(createUserUseCase.execute({ ...mock[1] })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create user, passwords do not match', async () => {
    expect(createUserUseCase.execute({ ...mock[2] })).rejects.toBeInstanceOf(AppError);
  });
});
