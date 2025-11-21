import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import {connectDB} from './config/db.js'
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from "cookie-parser";


dotenv.config()
const app= express();

//middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes)
app.use('/api/auth',authRoutes)
// port listener
const PORT=process.env.PORT||5000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))