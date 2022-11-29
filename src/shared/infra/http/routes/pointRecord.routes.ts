import { CreatePointRecordController } from '@users/useCases/createPointRecord/CreatePointRecordController';
import { ListPointRecordsController } from '@users/useCases/listPointRecords/ListPointRecordsController';
import { Router } from 'express';
import { ensureAdmin } from '@middlewares/ensureAdmin';

const pointRecords = Router();
const createPointRecordController = new CreatePointRecordController();
const listPointRecordsController = new ListPointRecordsController();

pointRecords.get('/', createPointRecordController.handle);
pointRecords.get('/list', ensureAdmin, listPointRecordsController.handle);

export { pointRecords };
