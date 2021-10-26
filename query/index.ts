import { Server } from "..";
import { QUERY_PORT } from '../utils';
import { queryRoutes } from './routes';

export const server = new Server(QUERY_PORT, 'query');
server.registeRoutes(queryRoutes);

server.start(() => {
  console.log('start');
});

