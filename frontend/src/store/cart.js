import { create } from "zustand";
import { apiRequest } from "../services/api.js"
export const useCart=create((set)=>({

cart:[],

// fetchCart:async ()=>{
//   const res = await fetch('/api/cart/guest');
//   //这个返回的是服务器响应对象，不是data本身，还带有success:true
//   const data= await res.json();
//    console.log("🔥 FETCH RESULT:", data);
//   set({ cart: Array.isArray(data.data) ? data.data : [] });
//   return true;
// },
fetchCart:async()=>{

const{ok,data} = await apiRequest('/api/cart/guest');

 if(ok && Array.isArray(data?.data)){
  set({cart:data.data});
  return true
 }
 set({ cart: [] }); // 请求失败的 fallback，避免 undefined
  return false;

},

// addToCart:async (product)=>{
//   const res=await fetch("/api/cart",{
//     method:"POST",
//     headers:{"content-type":"application/json"},
//     body:JSON.stringify({
//       userId:"guest",
//       productId:product._id,
//     }),
//   }
// )
//  const data= await res.json()
// set({ cart: Array.isArray(data.data) ? data.data : [] });
// },

addToCart:async(product)=>{
  const {ok,data}= await apiRequest('/api/cart',{
    method:"POST",
    body:JSON.stringify({
          userId:"guest",
          productId:product._id,
       }),
  })
  if(ok&&Array.isArray(data.data)){
    set({cart:data.data})
    return true
  }
  set({cart:[]})
  return false
},

// removeFromCart:async (itemId)=>{
//   const res =await fetch(`/api/cart/guest/${itemId}`,{
//     method:"DELETE",
//   })
//   set((state)=>({cart:state.cart.filter((s)=>s._id!==itemId)}))
// },

removeFromCart:async(itemId)=>{
  const{ok} = await apiRequest(`/api/cart/guest/${itemId}`,{
    method:"DELETE"
  })
    if(ok){
  set((state)=>({cart:state.cart.filter((s)=>s._id!==itemId)}))
          } 
},

// updateQuantity: async(itemId,action)=>{

//   const res = await fetch(`/api/cart/guest/${itemId}`,{
//     method:"PUT",
//     headers:{"Content-type":"application/json"},
//     body:JSON.stringify({action})
//   })
//   const updatedCart = await res.json();
//   console.log("updated cart",updatedCart)
//   set({ cart: Array.isArray(updatedCart.data) ? updatedCart.data : [] });

// },

updateQuantity:async(itemId,action)=>{
  const {ok,data} =await apiRequest(`/api/cart/guest/${itemId}`,{
    method:"PUT",
    body:JSON.stringify({action})
  })
   if(ok&&Array.isArray(data.data)){
    set({cart:data.data})
    return true
  }
  set({cart:[]})
  return false


},



}))