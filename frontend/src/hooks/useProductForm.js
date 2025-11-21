import {useState} from 'react'

export function useProductForm(initial={}){

  const[product,setProduct]= useState(initial);

  const handleChange=(e)=>{
    setProduct({
      ...product,
      [e.target.name]:e.target.value,
    })
  }

return {product,setProduct,handleChange}
}