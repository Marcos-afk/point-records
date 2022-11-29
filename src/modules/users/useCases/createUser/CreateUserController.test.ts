import request from 'supertest';
import { serverHttp } from '@shared/infra/http/app';
import { AppSource, InitializeConnection } from '@shared/infra/typeorm';
import { mock } from './mock';

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
    const response = await request(serverHttp).post('/api/v1/users').send({
      name: mock[0].name,
      email: mock[0].email,
      password: mock[0].password,
      confirmPassword: mock[0].confirmPassword,
      role: mock[0].role,
    });

    expect(response.body.message).toBe('Usuário cadastrado com sucesso!');
    expect(response.statusCode).toBe(201);
  });

  it('should not be able to create user, user email already exists', async () => {
    const response = await request(serverHttp).post('/api/v1/users').send({
      name: mock[1].name,
      email: mock[1].email,
      password: mock[1].password,
      confirmPassword: mock[1].confirmPassword,
      role: mock[1].role,
    });

    expect(response.body.message).toBe('Email inválido');
    expect(response.statusCode).toBe(400);
  });

  it('should not be able to create user, passwords do not match', async () => {
    const response = await request(serverHttp).post('/api/v1/users').send({
      name: mock[2].name,
      email: mock[2].email,
      password: mock[2].password,
      confirmPassword: mock[2].confirmPassword,
      role: mock[2].role,
    });

    expect(response.body.message).toBe('Senhas não conferem');
    expect(response.statusCode).toBe(400);
  });
});
