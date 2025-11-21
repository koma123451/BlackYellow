import { create } from "zustand";

export const useCart=create((set)=>({

cart:[],

fetchCart:async ()=>{
  const res = await fetch('/api/cart/guest');
  //这个返回的是服务器响应对象，不是data本身，还带有success:true
  const data= await res.json();
   console.log("🔥 FETCH RESULT:", data);
  set({ cart: Array.isArray(data.data) ? data.data : [] });
  return true;
},

addToCart:async (product)=>{
  const res=await fetch("/api/cart",{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify({
      userId:"guest",
      productId:product._id,
    }),
  }
)
 const data= await res.json()
set({ cart: Array.isArray(data.data) ? data.data : [] });
},

removeFromCart:async (itemId)=>{
  const res =await fetch(`/api/cart/guest/${itemId}`,{
    method:"DELETE",
  })
  set((state)=>({cart:state.cart.filter((s)=>s._id!==itemId)}))
},

updateQuantity: async(itemId,action)=>{

  const res = await fetch(`/api/cart/guest/${itemId}`,{
    method:"PUT",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify({action})
  })
  const updatedCart = await res.json();
  console.log("updated cart",updatedCart)
  set({ cart: Array.isArray(updatedCart.data) ? updatedCart.data : [] });

},



}))