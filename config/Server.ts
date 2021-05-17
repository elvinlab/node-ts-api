import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from '../routes/UserRoutes';
import { CommonRoutes } from '../routes/CommonRoutes';

class Server {
    private app: Application;
    private port: string;

    private _userRoutes: UserRoutes = new UserRoutes();
    private _commonRoutes: CommonRoutes = new CommonRoutes();

    constructor() {
        this.app = express();
        this.port = `${process.env.PORT}`;
        this.app.use(cors());
        this.app.use(express.json());

        this._userRoutes.route(this.app);
        this._commonRoutes.route(this.app);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost: ${process.env.PORT}`);
        });
    }
}

export default Server;
