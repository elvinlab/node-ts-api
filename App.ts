import dotenv from 'dotenv';
import Server from './config/Server';
import Database from './config/Database';

dotenv.config();

const server = new Server();

server.listen();

const database = new Database();
database.connect();
