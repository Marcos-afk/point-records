import { AppError } from '@shared/errors/AppError';
import { HashProvider } from '@shared/providers/HashProvider/HashProvider';
import { CreateUserDto } from '@users/dtos/CreateUserDto';
import { PointRecordsRepositoryInMemory } from '@users/in-memory/PointRecordsRepositoryInMemory';
import { UsersRepositoryInMemory } from '@users/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { CreatePointRecordUseCase } from './CreatePointRecordUseCase';

let createUserUseCase: CreateUserUseCase;
let createPointRecordUseCase: CreatePointRecordUseCase;
let hashProvider: HashProvider;
let pointRecordsRepositoryInMemory: PointRecordsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Create point record use case', () => {
  beforeEach(() => {
    hashProvider = new HashProvider();
    pointRecordsRepositoryInMemory = new PointRecordsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(hashProvider, usersRepositoryInMemory);
    createPointRecordUseCase = new CreatePointRecordUseCase(usersRepositoryInMemory, pointRecordsRepositoryInMemory);
  });

  it('should be able to record user point', async () => {
    const user: CreateUserDto = {
      name: 'usuário',
      email: 'teste@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
      role: 'colaborador',
    };

    const createdUser = await createUserUseCase.execute({ ...user });

    const pointRecord = await createPointRecordUseCase.execute({ user_id: createdUser.id });
    expect(pointRecord).toHaveProperty('id');
    expect(pointRecord).toHaveProperty('time_registered');
  });

  it('should not be able to record user point, user not found', async () => {
    expect(createPointRecordUseCase.execute({ user_id: 1 })).rejects.toBeInstanceOf(AppError);
  });
});
