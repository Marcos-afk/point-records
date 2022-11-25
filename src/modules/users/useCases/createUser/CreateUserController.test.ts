import request from 'supertest';
import { app } from '@shared/infra/http/app';
import { AppSource, InitializeConnection } from '@shared/infra/typeorm';
import { CreateUserDto } from '@users/dtos/CreateUserDto';

describe('Create user controller', () => {
  beforeAll(async () => {
    await InitializeConnection();
    await AppSource.runMigrations();
  });

  afterAll(async () => {
    await AppSource.dropDatabase();
    await AppSource.destroy();
  });

  it('should be able to create a new user', async () => {
    const user: CreateUserDto = {
      name: 'usuário',
      email: 'teste@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
      role: 'colaborador',
    };

    const response = await request(app).post('/api/v1/users').send({
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      role: user.role,
    });

    expect(response.body.message).toBe('Usuário cadastrado com sucesso!');
    expect(response.statusCode).toBe(201);
  });

  it('should not be able to create user, user email already exists', async () => {
    const user: CreateUserDto = {
      name: 'usuário',
      email: 'teste2@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
      role: 'colaborador',
    };

    const secondUser: CreateUserDto = {
      name: 'usuário 2',
      email: 'teste2@gmail.com',
      password: '12345678',
      confirmPassword: '12345678',
      role: 'administrador',
    };

    await request(app).post('/api/v1/users').send({
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      role: user.role,
    });

    const response = await request(app).post('/api/v1/users').send({
      name: secondUser.name,
      email: secondUser.email,
      password: secondUser.password,
      confirmPassword: secondUser.confirmPassword,
      role: user.role,
    });

    expect(response.body.message).toBe('Email inválido');
    expect(response.statusCode).toBe(400);
  });

  it('should not be able to create user, passwords do not match', async () => {
    const user: CreateUserDto = {
      name: 'usuário',
      email: 'teste3@gmail.com',
      password: '123456789',
      confirmPassword: '12345678',
      role: 'colaborador',
    };

    const response = await request(app).post('/api/v1/users').send({
      name: user.name,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      role: user.role,
    });

    expect(response.body.message).toBe('Senhas não conferem');
    expect(response.statusCode).toBe(400);
  });
});
