import express from 'express';
import{getCart,addToCart,removeFromCart,updateQuantity} from '../controllers/cart.controller.js'
import {protect} from '../middleware/auth.middleware.js'
const router = express.Router();

router.get('/',protect,getCart);
router.post('/',protect,addToCart);
router.delete('/:itemId',protect,removeFromCart)
router.put('/:itemId',protect,updateQuantity)
// console.log("PUT Route Hit:", req.params);

export default router;