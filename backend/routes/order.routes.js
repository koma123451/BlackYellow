import express from "express";
import { protect } from "../middleware/auth.middleware.js" 
import {createOrder,getOrderById} from '../controllers/order.controller.js'

const router = express.Router();

// CREATE ORDER
router.post("/",protect,createOrder );
router.get("/:id",protect,getOrderById)
export default router;
