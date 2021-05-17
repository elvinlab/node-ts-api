import { Application, Request, Response } from 'express';

export class CommonRoutes {
    public route(app: Application) {
        //URl Invalidas retornamos un mensaje de error
        app.all('*', function (req: Request, res: Response) {
            res.status(404).send({ error: true, message: 'Check your URL please' });
        });
    }
}
