import { Box, Text, SimpleGrid, VStack, Image, Button, HStack, Input, Select } from "@chakra-ui/react";
import { useState,useEffect } from "react";
import {useProductStore} from '../../store/product.js'
import ProductCard from '../../components/product/ProductCard.jsx'
import BrandShowCase from '../common/BrandShowcase.jsx'

const ProductSection = () => {
  const products=useProductStore((s)=>s.products)
  const {fetchProduct} = useProductStore()
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchItem,setSearchItem]=useState("")
  const [sortPrice,setSortPrice]=useState("")
  useEffect(()=>{
    fetchProduct()
  },[fetchProduct])
  const filterdProducts = products
  .filter((p)=>
    selectedBrand
  ?(p.brand).toLowerCase().trim()===selectedBrand.toLowerCase().trim():true
  )
  .filter((p)=>
    p.name.toLowerCase().includes(searchItem.toLowerCase())
  )
  .sort((a,b)=>{
   if(sortPrice==="low to high") return a.price-b.price;
   if(sortPrice==="high to low") return b.price-a.price
   return 0 //defalut
  }       
  )

  return (
    <Box>
      <BrandShowCase onBrandSelect={setSelectedBrand}/>
    <Box bg="black" py={20} px={[6, 12]} maxW="1200px" mx="auto"> {/* mx===center */}
      <VStack spacing={12}>
        <HStack w="100%" spacing={4}>
        <Input bg="gray800" placeholder="Search keyboard by brand or name" value={searchItem} onChange={(e)=>setSearchItem(e.target.value)} flex="6"/>
        <Select flex="1" placeholder=" Sort By Price" onChange={(e)=>setSortPrice(e.target.value)}>
         
          <option value="low to high">Low to High</option>
          <option value="high to low">High to Low</option>
        </Select>
        </HStack>
        <Text
          fontSize={["2xl", "4xl"]}
          fontWeight="bold"
          color="yellow.400"
          letterSpacing="1px"
        >
          {selectedBrand?`Showing ${selectedBrand}` :"Explore Our Keyboards"}
        </Text>

        <SimpleGrid columns={[1, 2, 3]} spacing={10}>
          {filterdProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </SimpleGrid>
        {(selectedBrand||sortPrice)&&(<Button
        onClick={()=>setSelectedBrand(null)}
        >Show All Products</Button>)}
      </VStack>
    </Box>
    </Box>
  );
};

export default ProductSection;
