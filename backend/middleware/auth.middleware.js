//验证token的地方
import jwt from "jsonwebtoken"

export const protect =(req,res,next)=>{
    console.log("🍪 Raw headers cookie:", req.headers.cookie);
  console.log("🍪 Parsed:", req.cookies);
  const token = req.cookies.token;
  console.log("token",token)
  if(!token) return res.status(401).json({message:"Not authorized"});
  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
     req.userId = decoded.id;
    req.user = { id: decoded.id, role: decoded.role };
    next()
  }catch(error){
    return res.status(401).json({message:"Invalid token"});
  }
}