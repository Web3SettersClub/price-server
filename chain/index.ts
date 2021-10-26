import { Server } from "..";
import { CHAIN_PORT } from '../utils';
import { chainRoutes } from './routes'

const server = new Server(CHAIN_PORT, 'chain');
server.registeRoutes(chainRoutes);

server.start();