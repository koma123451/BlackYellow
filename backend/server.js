import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import orderRoutes from './routes/order.routes.js'
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js'

dotenv.config();
const app = express();


// ====================== CORS CONFIG ======================
const allowedOrigins = [
  "http://localhost:5173",
  "https://black-yellow-eta.vercel.app"  // ← Frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
// =========================================================


// body parser + cookie
app.use(express.json());
app.use(cookieParser());


// connect DB
connectDB();


// ====================== ROUTES ======================
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes)
app.use('/api/auth', authRoutes);
app.use('/api/orders',orderRoutes)
app.use('/api/users',userRoutes)
// ====================================================


// listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
