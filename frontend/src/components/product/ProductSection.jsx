import { Box, Text, SimpleGrid, VStack, Image, Button, HStack } from "@chakra-ui/react";
import { useState,useEffect } from "react";
import {useProductStore} from '../../store/product.js'
import ProductCard from '../../components/product/ProductCard.jsx'

const ProductSection = () => {
  const {fetchProduct} = useProductStore()
  useEffect(()=>{
    fetchProduct()
  },[fetchProduct])
  
const products=useProductStore((s)=>s.products)
  return (
    <Box bg="black" py={20} px={[6, 12]}>
      <VStack spacing={12}>
        <Text
          fontSize={["2xl", "4xl"]}
          fontWeight="bold"
          color="yellow.400"
          letterSpacing="1px"
        >
          Explore Our Keyboards
        </Text>

        <SimpleGrid columns={[1, 2, 3]} spacing={10}>
          {products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default ProductSection;
