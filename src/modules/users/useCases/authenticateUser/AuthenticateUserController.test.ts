import request from 'supertest';
import { app } from '@shared/infra/http/app';
import { AppSource, InitializeConnection } from '@shared/infra/typeorm';
import { hash } from 'bcryptjs';

describe('Create user controller', () => {
  beforeAll(async () => {
    await InitializeConnection();
    await AppSource.runMigrations();
    const password = await hash('admin', 8);

    AppSource.query(`INSERT INTO users(name, email, password, role)
    values('admin', 'admin@point.com.br', '${password}', 'administrador')`);
  });

  afterAll(async () => {
    await AppSource.dropDatabase();
    await AppSource.destroy();
  });

  it('should be able to create a session for the user', async () => {
    const response = await request(app).post('/api/v1/users/login').send({
      email: 'admin@point.com.br',
      password: 'admin',
    });

    expect(response.body.message).toBe('Login realizado com sucesso!');
    expect(response.statusCode).toBe(200);
  });

  it('should not be able to create session for user, invalid email', async () => {
    const response = await request(app).post('/api/v1/users/login').send({
      email: 'admin@point2.com.br',
      password: 'admin',
    });

    expect(response.body.message).toBe('Email ou senha incorreto');
    expect(response.statusCode).toBe(404);
  });

  it('should not be able to create session for user, invalid password', async () => {
    const response = await request(app).post('/api/v1/users/login').send({
      email: 'admin@point.com.br',
      password: 'admin2',
    });

    expect(response.body.message).toBe('Email ou senha incorreto');
    expect(response.statusCode).toBe(400);
  });
});
