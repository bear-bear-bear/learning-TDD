import express from 'express';
import { createProduct, getProducts, getProductById } from './controllers/products';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:productId', getProductById);

export default router;
