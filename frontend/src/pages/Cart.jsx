import { Box, HStack, VStack ,Image,Text,Button,SimpleGrid} from "@chakra-ui/react";
import CartCard from '../components/cart/CartCard.jsx'
import {useCart} from '../store/cart.js'
import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";


const Cart = ()=>{
  const navigate = useNavigate()
  const {cart,fetchCart,removeFromCart,updateQuantity}=useCart();
  const subtotal=cart.reduce((sum,item)=>{
    return sum+item.productId.price*item.quantity
  },0)
console.log("cart:",cart); // 可能是 object 或 null，而不是 array
console.log(typeof cart)
  useEffect(()=>{
  fetchCart().then(()=>console.log("📦 Cart after fetch:",cart))
  },[])
  console.log("cart::",cart)
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
> <HStack w="100%" align="flex-start" spacing={8}  justify="center" >
      <VStack spacing={5} w="full" maxW="1000px" align="center" flex="6">
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
      <VStack
  w="350px"
  bg="gray.800"
  p={8}
  borderRadius="lg"
  spacing={6}
  align="stretch"
  boxShadow="lg"
>

  <Text fontSize="2xl" fontWeight="bold" color="yellow.400">
    Order Summary
  </Text>

  {/* Subtotal */}
  <HStack justify="space-between">
    <Text color="gray.300">Subtotal</Text>
    <Text color="white" fontWeight="bold">
      ${subtotal.toFixed(2)}
    </Text>
  </HStack>

  {/* Taxes (假设 13% HST，你之后可自定义) */}
  <HStack justify="space-between">
    <Text color="gray.300">Tax (13%)</Text>
    <Text color="white" fontWeight="bold">
      ${(subtotal * 0.13).toFixed(2)}
    </Text>
  </HStack>

  {/* Divider */}
  <Box borderBottom="1px" borderColor="gray.600" />

  {/* Total */}
  <HStack justify="space-between">
    <Text fontSize="xl" fontWeight="bold" color="yellow.300">
      Total
    </Text>
    <Text fontSize="xl" fontWeight="bold" color="yellow.300">
      ${(subtotal * 1.13).toFixed(2)}
    </Text>
  </HStack>

  {/* Checkout button */}
  <Button
    colorScheme="yellow"
    size="lg"
    mt={4}
    w="100%"
    onClick={() => navigate("/CheckoutPage")}
  >
    Checkout
  </Button>

</VStack>

      </HStack>
    </Box>
  )

}
export default Cart;