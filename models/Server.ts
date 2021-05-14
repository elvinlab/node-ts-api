import express, { Application } from 'express';
import {todoRouter} from '../routes/Ruta'

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = `${process.env.PORT}` ;
        this.app.use(todoRouter);
    }
    
    listen() {
        this.app.listen(this.port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost: ${process.env.PORT}`);
        });
    }
}

export default Server;
