import dotenv from 'dotenv';
import Server from './models/Server';
import Database from './database/Database';

dotenv.config();

const server = new Server();

server.listen();

const database = new Database();
database.connect();
