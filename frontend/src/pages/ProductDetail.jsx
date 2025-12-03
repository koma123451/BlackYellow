import { Box,Image,Text,Button } from "@chakra-ui/react"
import {useProductStore} from '../store/product'
import {useEffect} from 'react'
import { useParams } from "react-router-dom";
import {useCart} from '../store/cart'
import { useUserStore } from "../store/user";
import { useNavigate } from "react-router-dom";

const ProductDetail=()=>
{
  const {id} = useParams();
  const products = useProductStore((s)=>s.products)
  const {fetchProduct} = useProductStore();
  const {addToCart} = useCart()
  const user = useUserStore((s)=>s.user);
  const navigate = useNavigate();
  //if user refresh the page ,the page will be empty, need to be fetch
  useEffect(()=>{
    fetchProduct();
  },[fetchProduct])
  const product = products.find((p)=>p._id===id)
  console.log("product",product)
  if(!product) return <Text color="white">Loading</Text>

  return <>
<Box 
  bg="gray.900"
  color="white"
  minH="100vh"
  px={[4, 8, 20]}
  py={16}
  display="flex"
  justifyContent="center"
>
  <Box 
    maxW="1000px" 
    w="100%"
    display="flex"
    flexDirection={["column", "column", "row"]}
    gap={12}
    alignItems="center"
  >
    {/* Product Image */}
    <Box flex="1" textAlign="center">
      <Image 
        src={product.image} 
        w={["250px", "300px", "400px"]} 
        mx="auto"
        borderRadius="lg"
        boxShadow="lg"
      />
    </Box>

    {/* Product Info */}
    <Box flex="1" textAlign={["center", "center", "left"]}>
      <Text fontSize="4xl" fontWeight="bold" mb={2}>
        {product.name}
      </Text>

      <Text fontSize="2xl" fontWeight="semibold" color="yellow.300" mb={4}>
        ${product.price}
      </Text>

      <Text fontSize="lg" opacity={0.8} mb={2}>
        Brand: <strong>{product.brand}</strong>
      </Text>

      <Text fontSize="lg" opacity={0.8} mb={6}>
        Keyboard Type: <strong>{product.type}</strong>
      </Text>

      <Box mt={8}>
        <Button 
          size="lg"
          colorScheme="yellow"
          w={["100%", "60%", "50%"]}
          onClick={async ()=>{
            if(!user){
              navigate("/login");
              return
            }
            await addToCart(product)
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  </Box>
</Box>

  </>
}

export default ProductDetail