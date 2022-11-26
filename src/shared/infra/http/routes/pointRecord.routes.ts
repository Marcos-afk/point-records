import { CreatePointRecordController } from '@users/useCases/createPointRecord/CreatePointRecordController';
import { ListPointRecordsController } from '@users/useCases/listPointRecords/ListPointRecordsController';
import { Router } from 'express';

const pointRecords = Router();
const createPointRecordController = new CreatePointRecordController();
const listPointRecordsController = new ListPointRecordsController();

pointRecords.get('/', createPointRecordController.handle);
pointRecords.get('/list', listPointRecordsController.handle);

export { pointRecords };
