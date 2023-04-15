import express from 'express';
import { getAllProducts, getProductById, createProduct } from '../controllers/product';

const router = express.Router();
console.log('Server started at http://localhost:9090');

// POST create product
router.post('/Product/createProduct', createProduct);
// GET all products
router.get('/', getAllProducts);

// GET product by ID
router.get('/:id', getProductById);



export default router;
 