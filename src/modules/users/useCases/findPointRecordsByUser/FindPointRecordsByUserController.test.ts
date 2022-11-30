import request from 'supertest';
import { serverHttp } from '@shared/infra/http/app';
import { AppSource, InitializeConnection } from '@shared/infra/typeorm';
import { hash } from 'bcryptjs';

describe('Find point records by user controller', () => {
  beforeAll(async () => {
    await InitializeConnection();
    await AppSource.runMigrations();
    const password = await hash('admin', 8);

    AppSource.query(`INSERT INTO users(name, email, password, role)
    values('admin', 'admin@point.com.br', '${password}', 'administrador')`);

    AppSource.query(`INSERT INTO point_records(user_id) values('1')`);
  });

  afterAll(async () => {
    await AppSource.dropDatabase();
    await AppSource.destroy();
  });

  it('should be able to return all records by user id', async () => {
    const responseToken = await request(serverHttp).post('/api/v1/users/login').send({
      email: 'admin@point.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body.response;

    const response = await request(serverHttp)
      .get('/api/v1/point-records/user')
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.body.message).toBe('Lista de registro de pontos do usuário!');
    expect(response.statusCode).toBe(200);
  });
});
