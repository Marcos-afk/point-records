import { container } from 'tsyringe';
import { HashProviderProps } from '@providers/HashProvider/HashProviderProps';
import { HashProvider } from '@providers/HashProvider/HashProvider';
import { UsersRepositoryProps } from '@users/repositories/UsersRepositoryProps';
import { UsersRepository } from '@users/infra/typeorm/repositories/UsersRepository';
import { PointRecordsRepositoryProps } from '@users/repositories/PointRecordsRepositoryProps';
import { PointRecordsRepository } from '@users/infra/typeorm/repositories/PointRecordsRepository';

container.registerSingleton<HashProviderProps>('HashProvider', HashProvider);
container.registerSingleton<UsersRepositoryProps>('UsersRepository', UsersRepository);
container.registerSingleton<PointRecordsRepositoryProps>('PointRecordsRepository', PointRecordsRepository);
