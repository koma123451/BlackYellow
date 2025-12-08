import {useState} from "react"
import{Box,useToast} from "@chakra-ui/react"
import {useProductStore} from '../store/product.js'
import ProductForm from '../components/product/ProductForm.jsx'
import {useUserStore} from '../store/user.js'
const CreatePage = ()=>{
 
  const addProduct = useProductStore((s)=>s.addProduct)
  const user = useUserStore(s => s.user);
  const [product,setProduct]= useState({
    name:"",
    brand:"",
    price:"",
    image:"",
    type:"",
  });
  const toast = useToast();
const handleChange=(e)=>{
  const{name,value}=e.target;
  setProduct({...product,[name]:value})
  
}
const handleSubmit = async (e)=>{
  e.preventDefault();
  if (user?.role !== "admin") {
      toast({
        title: "Admin access only",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  if(!product.name||!product.type||!product.brand||!product.price){
    toast({
      title:"Missing fields",
      description:"Please fill in all required fields",
      status:"warning",
      duration:3000,
      isClosable:true,
    }) 
    return;
  }
  const{success,message}= await addProduct(product);
 if(success){
  toast({
    title:"Product created",
    description:`${product.name} has been added.`, 
    status:"success",
    duration:3000,
    isClosable:true,
  });
   setProduct({name:"",brand:"",price:"",image:"",type:""})
  }else{
    toast({
      title:"Server error",
      description:{message}||"something went wrong",
      status:"warning",
      duration:3000,
      isClosable:true,
    }) 
    return;
  }
 
}
return(
  <Box bg="black" color="white" minH="100vh" py={10}>
  <ProductForm
  product={product}
  handleChange={handleChange}
  handleSubmit={handleSubmit}
  >
  </ProductForm> 
  </Box>
)
}
export default CreatePage;