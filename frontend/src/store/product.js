import { create } from "zustand";

export  const useProductStore = create((set)=>({

  products:[],
addProduct: async (newProduct)=>{
  if(!newProduct.name||!newProduct.brand||!newProduct.price||!newProduct.image) {
    return {success:false,message:"Please enter all fields"}
  }
  const res = await fetch("/api/products",{
    method:"POST",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify(newProduct)
  })
  const data= await res.json()

  set((state)=>({
    products:[...state.products,data.data]
  }))
  return {success:true,message:"Product created successfully!"}
},
fetchProduct: async()=>{
  const res = await fetch('/api/products');
  const data = await res.json();

 set({products:data.data})
},

fetchSingleProduct: async(newProduct)=>{
 if(!newProduct.name||!newProduct.brand||!newProduct.price||!newProduct.image) {
    return {success:false,message:"Please enter all fields"}
  }
  const res = await fetch(`/api/products/${newProduct._id}`,{
    method:"PUT",
    headers:{"Content-type":"application/json"},
    body:JSON.stringify(newProduct)
  })
  const updatedProduct = await res.json()
  console.log(updatedProduct)
  set((state)=>({
    products: state.products.map((p) =>
    p._id === updatedProduct.data._id ? updatedProduct.data : p
  ),
  }))
  
}
}
))