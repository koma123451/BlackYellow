import express from 'express';
import{getCart,addToCart,removeFromCart,updateQuantity} from '../controllers/cart.controller.js'

const router = express.Router();

router.get('/:userId',getCart);
router.post('/',addToCart);
router.delete('/:userId/:itemId',removeFromCart)
router.put('/:userId/:itemId',updateQuantity)
// console.log("PUT Route Hit:", req.params);

export default router;