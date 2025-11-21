import { Box, Text, SimpleGrid, VStack, Image, Button, HStack } from "@chakra-ui/react";
import {useCart} from '../../store/cart.js'
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
const navigate = useNavigate();
  const{addToCart,fetchCart} = useCart();
  return (
    <Box
      bg="gray.900"
      rounded="xl"
      overflow="hidden"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
      }}
      transition="all 0.3s ease"
    >
      <Image src={product.image} alt={product.name} h="200px" w="full" objectFit="cover" />

      <Box p={5}>
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold" color="white" fontSize="lg">
            {product.name}
          </Text>
          <Text color="gray.400" fontSize="sm">
            {product.brand}
          </Text>
          <HStack justify="space-between" w="full">
            <Text color="yellow.400" fontSize="xl">
              {product.price}
            </Text>
            <Button
              colorScheme="yellow"
              size="sm"
              bg="yellow.400"
              color="black"
              _hover={{ bg: "yellow.300" }}
              onClick={async ()=>{
                console.log("🟢 adding to cart:", product);
                await addToCart(product)
                await fetchCart()       }
              }
            >
              Add to Cart
            </Button>
             <Button
              colorScheme="yellow"
              size="sm"
              bg="yellow.400"
              color="black"
              _hover={{ bg: "yellow.300" }}
              onClick={()=>{
                navigate(`/EditPage/${product._id}`)}
              }
            >
              Edit Product
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
export default ProductCard;