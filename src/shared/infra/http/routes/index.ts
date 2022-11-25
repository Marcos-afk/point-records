import { Router } from 'express';
import { usersRoutes } from './users.routes';

const Routes = Router();

Routes.use('/users', usersRoutes);

export { Routes };
