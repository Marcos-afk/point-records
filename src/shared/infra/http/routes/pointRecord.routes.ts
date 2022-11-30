import { CreatePointRecordController } from '@users/useCases/createPointRecord/CreatePointRecordController';
import { ListPointRecordsController } from '@users/useCases/listPointRecords/ListPointRecordsController';
import { Router } from 'express';
import { ensureAdmin } from '@middlewares/ensureAdmin';
import { FindPointRecordByUserController } from '@users/useCases/findPointRecordsByUser/FindPointRecordsByUserController';

const pointRecords = Router();
const createPointRecordController = new CreatePointRecordController();
const listPointRecordsController = new ListPointRecordsController();
const findPointRecordsByUserController = new FindPointRecordByUserController();

pointRecords.get('/', createPointRecordController.handle);
pointRecords.get('/list', ensureAdmin, listPointRecordsController.handle);
pointRecords.get('/user', findPointRecordsByUserController.handle);

export { pointRecords };
