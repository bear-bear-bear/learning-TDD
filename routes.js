import express from 'express';
import {createProduct, getProducts, getProductById, updateProduct} from './controllers/products';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:productId', getProductById);
router.put('/:productId', updateProduct);

export default router;
