import 'reflect-metadata';
import 'express-async-errors';
import '@container/index';
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { errors } from 'celebrate';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './docs/swagger_output.json';
import { InitializeConnection } from '@shared/infra/typeorm';
import { Routes } from './routes';
import { rateLimiter } from '@middlewares/rateLimiter';
import { catchErros } from '@middlewares/catchErrors';

config();

const app = express();
InitializeConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(rateLimiter);
app.use('/api/v1', Routes);
app.use(errors());
app.use(catchErros);

export { app };
