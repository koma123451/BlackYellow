import {getProducts,createProduct,updateProduct} from '../controllers/product.controller.js'
import express from 'express';
import {protect} from '../middleware/auth.middleware.js'
import {adminOnly} from '../middleware/admin.middleware.js'
const router =express.Router();

router.get("/",getProducts);
router.post("/",protect,adminOnly,createProduct)
router.put("/:id",protect,adminOnly,updateProduct)
export default router;