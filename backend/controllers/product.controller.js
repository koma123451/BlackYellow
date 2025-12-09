import {Product} from '../models/product.model.js'

export const getProducts = async (req,res)=>{

  const products = await Product.find();
  
  res.json({success:true,data:products})
}
export const createProduct = async(req,res)=>{
try{
  console.log("🟢 Incoming request body:", req.body); 
  const newProduct= new Product(req.body);
  console.log("🟡 Created Mongoose instance:", newProduct); 
  await newProduct.save();
  res.status(201).json({success:true,data:newProduct})
}catch(error){
  console.error("🔴 Create product error:", error.message);
  res.status(400).json({success:false,message:error.message})
}}
export const updateProduct = async(req,res)=>{
 
  try{
    const{id}=req.params;
    const products = await Product.findByIdAndUpdate(
      id,
      req.body,
      {new:true} //return updated version
    )
    if(!products){
      return res.status(404).json({success:true,message:"Product not found"})
    }
    res.status(200).json({success:true,data:products})

  }catch(error){
console.log(error)
    res.status(500).json({ success: false, message: "Server error" })
  }
}
export const getProductById = async(req,res)=>{

  try{
    const {id}= req.params;
    const product = await Product.findById(id);
    res.status(200).json({success:true,data:product})

    
  }catch(error){
    res.status(404).json({success:true,message:"Product not found"})
  }
}