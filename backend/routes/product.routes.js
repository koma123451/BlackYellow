import {getProducts,createProduct,updateProduct} from '../controllers/product.controller.js'
import express from 'express';
const router =express.Router();

router.get("/",getProducts);
router.post("/",createProduct)
router.put("/:id",updateProduct)
export default router;