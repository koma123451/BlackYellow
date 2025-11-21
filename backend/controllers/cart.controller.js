import {Cart} from '../models/cart.model.js'

//获取当前购物车

export const getCart = async(req,res)=>{
  try{
    const {userId} = req.params;
    const cart = await Cart.findOne({userId}).populate("products.productId")
    res.json({success:true,data:cart?.products||{products:[]}})

  }catch(error){
    console.log(error.message)
    res.status(500).json({success:false,message:error.message})
  }
}

export const addToCart = async(req,res)=>{
  try{
    console.log("🟡 Incoming cart data:", req.body);
    const {userId,productId}= req.body;
    let cart = await Cart.findOne({userId})

    if(!cart){
      cart=new Cart({userId,products:[{productId,quantity:1}]})
    }else{
      const existing = cart.products.find(
        (p)=>p.productId.toString()===productId
      );
      if(existing){
        existing.quantity+=1;
      }else{
        cart.products.push({productId,quantity:1});
      }
    }

    await cart.save();
    res.status(201).json({success:true,data:cart});

  }catch(error){
    console.log(error.message)
    res.status(400).json({success:false,message:error.message})
    
  }
}

export const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    console.log("params:", req.params);

    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      console.log("❌ Cart not found for userId:", userId);
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

   

 cart.products = cart.products.filter(
  (p) => p._id.toString() !== itemId
);


  

    await cart.save();

    const refreshed = await Cart.findOne({ userId });
    console.log("✅ Database after save:");
    console.log(JSON.stringify(refreshed, null, 2));

    res.json({ success: true, data: refreshed.products });
  } catch (error) {
    console.error("❌ removeFromCart error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateQuantity = async(req,res)=>{
  console.log("PUT Route Hit:", req.params);
  const {userId,itemId} =req.params;
  
  const{action} = req.body;
  const cart = await Cart.findOne({userId}).populate("products.productId");
  if(!cart){ 
    console.log("❌ cart not found for",userId)
    return res.status(404).json({success:false,message:"cart not found"});}
  const item = cart.products.find(p=>p._id.toString()===itemId)
  if(!item){ console.log("❌ item not found for productId", itemId); return res.status(404).json({success:false,message:"product not found"})}
    if(action==="increase"){
      item.quantity++
    }else if(action ==="decrease"){
      item.quantity = Math.max(1,item.quantity-1);//不能少于1
    }
    await cart.save();
    res.json({success:true,data:cart.products})

}
