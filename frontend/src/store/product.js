import { create } from "zustand";
import { apiRequest } from "../services/api.js"

export  const useProductStore = create((set)=>({

  products:[],
// addProduct: async (newProduct)=>{
//   if(!newProduct.name||!newProduct.brand||!newProduct.price||!newProduct.image) {
//     return {success:false,message:"Please enter all fields"}
//   }
//   const res = await fetch("/api/products",{
//     method:"POST",
//     headers:{"Content-type":"application/json"},
//     body:JSON.stringify(newProduct)
//   })
//   const data= await res.json()

//   set((state)=>({
//     products:[...state.products,data.data]
//   }))
//   return {success:true,message:"Product created successfully!"}
// },
  addProduct:async (newProduct) =>{
    if(!newProduct.name||!newProduct.brand||!newProduct.price||!newProduct.image) {
     return {success:false,message:"Please enter all fields"}
  }
    const {ok,data} = await apiRequest("/products",{
      method:"POST",
      body:JSON.stringify(newProduct)
     })
     if(ok){
      set((state)=>({
        products:[...state.products,data.data]
      }))
      return {success:true,message:"Product created successfully!"}
     }


  },



// fetchProduct: async()=>{
//   const res = await fetch('/api/products');
//   const data = await res.json();

//  set({products:data.data})
// },

  fetchProduct: async()=>{
    const {data} = await apiRequest('/products');
    console.log("productdetaildata",data.data)
    set({products:data.data})
  },

  

// fetchSingleProduct: async(newProduct)=>{
//  if(!newProduct.name||!newProduct.brand||!newProduct.price||!newProduct.image) {
//     return {success:false,message:"Please enter all fields"}
//   }
//   const res = await fetch(`/api/products/${newProduct._id}`,{
//     method:"PUT",
//     headers:{"Content-type":"application/json"},
//     body:JSON.stringify(newProduct)
//   })
//   const updatedProduct = await res.json()
//   console.log(updatedProduct)
//   set((state)=>({
//     products: state.products.map((p) =>
//     p._id === updatedProduct.data._id ? updatedProduct.data : p
//   ),
//   }))
  
// }
fetchSingleProduct:async(newProduct)=>{
   if(!newProduct.name||!newProduct.brand||!newProduct.price||!newProduct.image) {
       return {success:false,message:"Please enter all fields"}
     }
     const{ok,data} = await apiRequest(`/products/${newProduct._id}`,{
      method:"PUT",
      body:JSON.stringify(newProduct)
     })
     if(ok){
      set((state)=>({
        products: state.products.map((p)=>
        p.id===data.data._id?data.data:p)
      }))
     }
}
}
))