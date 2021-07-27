import express from 'express';
import * as productController from './controller/products';

const router = express.Router();

router.get('/', productController.hello);

export default router;
