import { CreatePointRecordController } from '@users/useCases/createPointRecord/CreatePointRecordController';
import { Router } from 'express';

const pointRecords = Router();
const createPointRecordController = new CreatePointRecordController();

pointRecords.get('/', createPointRecordController.handle);

export { pointRecords };
