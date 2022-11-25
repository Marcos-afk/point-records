import { container } from 'tsyringe';
import { HashProviderProps } from '@providers/HashProvider/HashProviderProps';
import { HashProvider } from '@providers/HashProvider/HashProvider';
import { UsersRepositoryProps } from '@users/repositories/UsersRepositoryProps';
import { UsersRepository } from '@users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<HashProviderProps>('HashProvider', HashProvider);
container.registerSingleton<UsersRepositoryProps>('UsersRepository', UsersRepository);
