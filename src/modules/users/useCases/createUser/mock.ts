import { CreateUserDto } from '@users/dtos/CreateUserDto';

export const mock: CreateUserDto[] = [
  {
    name: 'usuário',
    email: 'teste@gmail.com',
    password: '12345678',
    confirmPassword: '12345678',
    role: 'colaborador',
  },
  {
    name: 'usuário 2',
    email: 'teste@gmail.com',
    password: '12345678',
    confirmPassword: '12345678',
    role: 'administrador',
  },
  {
    name: 'usuário',
    email: 'teste2@gmail.com',
    password: '123456789',
    confirmPassword: '12345678',
    role: 'colaborador',
  },
];
