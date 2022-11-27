import { PointRecordsRepositoryInMemory } from '@users/in-memory/PointRecordsRepositoryInMemory';
import { ListPointRecordsUseCase } from './ListPointRecordsUseCase';

let listPointRecordsUseCase: ListPointRecordsUseCase;
let pointRecordsRepositoryInMemory: PointRecordsRepositoryInMemory;

describe('List point records use case', () => {
  beforeEach(() => {
    pointRecordsRepositoryInMemory = new PointRecordsRepositoryInMemory();
    listPointRecordsUseCase = new ListPointRecordsUseCase(pointRecordsRepositoryInMemory);
  });

  it('should be able to return an array of point records', async () => {
    const pointRecords = await listPointRecordsUseCase.execute();

    expect(pointRecords.length).toBe(0);
  });
});
