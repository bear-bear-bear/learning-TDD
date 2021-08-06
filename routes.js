import express from 'express';
import {createProduct, getProducts, getProductById, updateProduct, deleteProduct} from './controllers/products';

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:productId', getProductById);
router.put('/:productId', updateProduct);
router.delete('/:productId', deleteProduct);

export default router;
