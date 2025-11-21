import { Box, HStack, VStack ,Image,Text,Button,SimpleGrid} from "@chakra-ui/react";
import CartCard from '../components/cart/CartCard.jsx'
import {useCart} from '../store/cart.js'
import {useEffect} from 'react'


const Cart = ()=>{
  const {cart,fetchCart,removeFromCart,updateQuantity}=useCart();
console.log("cart:",cart); // 可能是 object 或 null，而不是 array
console.log(typeof cart)
  useEffect(()=>{
  fetchCart()
  },[])
  return(
    <Box
  bg="gray.900"
  color="white"
  p={4}
minH="100vh"
  w="100vw"
  mx="auto"
  py={20}
  align="center"
> 
      <VStack spacing={5} w="full" maxW="1000px" align="center">
  <Text
          fontSize={["2xl", "4xl"]}
          fontWeight="bold"
          color="yellow.400"
          letterSpacing="1px"
        >
          My Cart
        </Text>
    {cart.map((c)=>(
  <CartCard key={c._id}
   item={c}
   onRemove={()=>removeFromCart(c._id)}
   onIncrease={()=>updateQuantity(c._id,"increase")}
   onDecrease={()=>updateQuantity(c._id,"decrease")}/>
))}
      </VStack>
    </Box>
  )

}
export default Cart;