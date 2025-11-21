import { Box } from "@chakra-ui/react"
import ProductForm from '../components/product/ProductForm.jsx'
import{useProductStore} from '../store/product.js'
import {useProductForm} from '../hooks/useProductForm.js'
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

const EditPage = ()=>{
  const navigate = useNavigate();
  const{products,fetchSingleProduct,fetchProduct}=useProductStore();
 
  // const{handleChange}=useProductForm();
  const{id}=useParams();
   useEffect(() => {
  if (products.length === 0) {
    fetchProduct();  // ⬅️ store 里已经有这个
  }
}, []);
  const currentProduct = products.find(p=>String(p._id)===String(id))
  const {
  product, 
  handleChange
} = useProductForm(currentProduct);
  if (!currentProduct) return <Box color="white">Loading...</Box>
  

function handleSubmit(e){
     e.preventDefault(); // ⛔ 阻止页面刷新！！
     console.log("Submitting...", product);
   fetchSingleProduct(product)
    navigate("/"); 
   }
  
  return<>
  <Box bg="black" color="white" minH="100vh" py={10}>
    <ProductForm
    product={product}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    isEdit={true}

    >

    </ProductForm>
  </Box>
  </>
}

export default EditPage