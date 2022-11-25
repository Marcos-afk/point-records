import { Router } from 'express';
import { usersRoutes } from './users.routes';
import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { pointRecords } from './pointRecord.routes';

const Routes = Router();

Routes.use('/users', usersRoutes);
Routes.use('/point-records', ensureAuthenticated, pointRecords);

export { Routes };
