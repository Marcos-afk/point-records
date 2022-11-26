import request from 'supertest';
import { app } from '@shared/infra/http/app';
import { AppSource, InitializeConnection } from '@shared/infra/typeorm';
import { hash } from 'bcryptjs';

describe('Create point record controller', () => {
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

  it('should be able to record user point', async () => {
    const responseToken = await request(app).post('/api/v1/users/login').send({
      email: 'admin@point.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body.response;

    const response = await request(app)
      .get('/api/v1/point-records')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body.message).toBe('Ponto registrado com sucesso!');
    expect(response.statusCode).toBe(201);
  });
});
