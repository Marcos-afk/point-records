import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Signale } from 'signale';
config();

export const AppSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
});

export const InitializeConnection = async () => {
  const log = new Signale();
  const host = process.env.NODE_ENV === 'test' ? 'localhost' : process.env.POSTGRES_HOST;
  const database = process.env.NODE_ENV === 'test' ? process.env.POSTGRES_DB_TEST : process.env.POSTGRES_DB;

  try {
    await AppSource.setOptions({ host, database }).initialize();
    return log.scope('DataBase').success('DataBase connected');
  } catch {
    log.scope('DataBase').fatal('DataBase could not connected');
    process.exit(1);
  }
};
