import express from 'express';
import {registerUser,loginUser,logoutUser,getUser} from '../controllers/auth.controller.js'
import {protect} from '../middleware/auth.middleware.js'
const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout',logoutUser)
router.get("/", protect, (req, res, next) => {
  res.set({
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    "Surrogate-Control": "no-store"
  });
  next();
}, getUser);


export default router;