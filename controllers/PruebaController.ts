import {Request,Response} from 'express';
import { UserModel } from '../models/Users';

class PruebaController{
    async testGet(req:Request,res:Response){
        //doc!.get('nombre') para sacar un atributo
        const doc = await UserModel.findOne();
        return res.send(doc);
    };    
}

export default PruebaController;