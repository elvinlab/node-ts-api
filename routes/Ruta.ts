import express from 'express';
import PruebaController from '../controllers/PruebaController';

const router = express.Router();

const controller = new PruebaController();

router.get('/api/todo',[],controller.testGet);

export {router as todoRouter};