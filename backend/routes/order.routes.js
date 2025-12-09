import express from "express";
import { protect } from "../middleware/auth.middleware.js" 
import {createOrder,getOrderById,getAllOrders,updateOrderStatus} from '../controllers/order.controller.js'
import {adminOnly} from '../middleware/admin.middleware.js'

const router = express.Router();

// CREATE ORDER
router.post("/",protect,adminOnly,createOrder );
router.get("/:id",protect,adminOnly,getOrderById)
router.get("/",protect,adminOnly,getAllOrders)
router.patch("/:id/status",protect,adminOnly,updateOrderStatus)
export default router;
