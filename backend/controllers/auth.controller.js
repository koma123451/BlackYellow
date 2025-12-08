import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProd, 
  sameSite: isProd ? "none" : "lax", 
  path: "/",
};


const generateToken=(user)=>{
  return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"30d"});
}
export const getUser = async(req,res)=>{
 try{
  if(!req.userId) return res.status(401).json({message:"Not authenticated"});
  const user = await User.findById(req.userId).select("-password");
  if(!user) return res.status(404).json({message:"User not found"});

  res.json({
    id:user._id,
    username:user.username,
    email:user.email,
    role:user.role
  })

 }catch(error){
  console.error(error);
    res.status(500).json({message:"Server error"});
 }
}

export const registerUser = async(req,res)=>{
  const{username,email,password} = req.body;
  console.log("📩 req.body =>", req.body);


  //console.log("username",username)
  const exists = await User.findOne({email});
  if(exists) return res.status(400).json({message:"Email already exists"})
  const user = await User.create({username,email,password});
  console.log("newUser",user)
  res.cookie("token",generateToken(user),cookieOptions)
  res.json({
    id:user._id,
    username:user.username,
    email:user.email,
    role:user.role
  })
}
export const loginUser = async(req,res)=>{
  
  const{email,password}= req.body;
  console.log("email",email)
  const user = await User.findOne({email});
  if(!user||!(await user.matchPassword(password))){
    return res.status(401).json({message:"Invalid email or password"})
  }
  res.cookie("token",generateToken(user),cookieOptions)
  res.json({
    id:user._id,
    username:user.username,
    email:user.email,
    role:user.role
  })
}

export const logoutUser = (req,res)=>{
  // res.cookie("token","",{maxAge:1});
  // res.json({message:"Logged out"})
  res.clearCookie("token", cookieOptions);
  // res.clearCookie("token", {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "none",
  //   path: "/"
  // });
return res.json({ message: "Logged out" });
}