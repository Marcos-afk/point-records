import { AppError } from '@shared/errors/AppError';
import { HashProvider } from '@shared/providers/HashProvider/HashProvider';
import { UsersRepositoryInMemory } from '@users/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { mock } from '../createUser/mock';
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
    const createdUser = await createUserUseCase.execute({ ...mock[1] });
    const session = await authenticateUserUseCase.execute({ email: createdUser.email, password: mock[1].password });

    expect(session).toHaveProperty('token');
    expect(session).toHaveProperty('user');
  });

  it('should not be able to create session for user, invalid email', async () => {
    expect(authenticateUserUseCase.execute({ email: 'teste', password: '12345678' })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create session for user, invalid password', async () => {
    const createdUser = await createUserUseCase.execute({ ...mock[1] });
    expect(authenticateUserUseCase.execute({ email: createdUser.email, password: '123456789' })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
