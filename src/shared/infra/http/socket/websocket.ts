import { io } from '../app';
import { Signale } from 'signale';
import { container } from 'tsyringe';
import { ListPointRecordsUseCase } from '@users/useCases/listPointRecords/ListPointRecordsUseCase';
import { ListUsersAdminUseCase } from '@users/useCases/listUsersAdmin/ListUsersAdminUseCase';
const log = new Signale();

io.on('connect', async socket => {
  socket.on('disconnect', () => {
    log.scope('Socket').success(`Socket disconnected: ${socket.id}`);
  });

  socket.on('room', async () => {
    const listUsersAdminUseCase = container.resolve(ListUsersAdminUseCase);
    const users = await listUsersAdminUseCase.execute();
    const listPointRecordsUseCase = container.resolve(ListPointRecordsUseCase);
    const pointRecords = await listPointRecordsUseCase.execute();

    socket.join('teste');
    socket.to('teste').emit('get_point_records', pointRecords);
  });
});
