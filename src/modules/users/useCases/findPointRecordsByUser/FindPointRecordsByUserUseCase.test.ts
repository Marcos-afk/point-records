import { AppError } from '@shared/errors/AppError';
import { HashProvider } from '@shared/providers/HashProvider/HashProvider';
import { PointRecordsRepositoryInMemory } from '@users/in-memory/PointRecordsRepositoryInMemory';
import { UsersRepositoryInMemory } from '@users/in-memory/UsersRepositoryInMemory';
import { CreatePointRecordUseCase } from '../createPointRecord/CreatePointRecordUseCase';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { mock } from '../createUser/mock';
import { FindPointRecordsByUserUseCase } from './FindPointRecordsByUserUseCase';

let createUserUseCase: CreateUserUseCase;
let findPointRecordsByUser: FindPointRecordsByUserUseCase;
let createPointRecordUseCase: CreatePointRecordUseCase;
let hashProvider: HashProvider;
let pointRecordsRepositoryInMemory: PointRecordsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe('Find point records by user use case', () => {
  beforeEach(() => {
    hashProvider = new HashProvider();
    pointRecordsRepositoryInMemory = new PointRecordsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(hashProvider, usersRepositoryInMemory);
    createPointRecordUseCase = new CreatePointRecordUseCase(usersRepositoryInMemory, pointRecordsRepositoryInMemory);
    findPointRecordsByUser = new FindPointRecordsByUserUseCase(usersRepositoryInMemory, pointRecordsRepositoryInMemory);
  });

  it('should be able to return all records by user id', async () => {
    const createdUser = await createUserUseCase.execute({ ...mock[1] });
    createPointRecordUseCase.execute({ user_id: createdUser.id });
    const pointRecords = await findPointRecordsByUser.execute({ user_id: createdUser.id });
    expect(pointRecords.length).toBe(1);
  });

  it('should not be able to return all records by user id, user not found', async () => {
    expect(findPointRecordsByUser.execute({ user_id: 1 })).rejects.toBeInstanceOf(AppError);
  });
});
