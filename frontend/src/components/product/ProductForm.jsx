
import{VStack,Input,Button,Text,Select} from "@chakra-ui/react"

const ProductForm = ({product,handleChange,handleSubmit,isEdit})=>{


return <>
<VStack spacing={5} w={["90%","60%","40%"]} mx="auto" as="form" onSubmit={handleSubmit}>
  <Text fontSize="3xl" fontWeight="bold" color="yellow.400">
    {isEdit?"Edit Product":"Create New Product"}
  </Text>

  <Input 
  placeholder="Product Name"
  name="name"
  value={product.name}
  onChange={handleChange}
  bg="gray.800"
  />
  <Input
  placeholder="Brand"
  name="brand"
  value={product.brand}
  onChange={handleChange}
  bg="gray.800"
  />
  <Input
  placeholder="Price"
  name="price"
  value={product.price}
  onChange={handleChange}
  bg="gray.800"
  />
  <Input
  placeholder="Image"
  name="image"
  value={product.image}
  onChange={handleChange}
  bg="gray.800"
  />
  <Select
  placeholder="select type of keyboard"
  name="type"
  value={product.type}
  onChange={handleChange}
  bg="gray.800"
  >
    <option value="65%">65%</option>
    <option value="75%">75%</option>
    <option value="100%">100%</option>
  </Select>

  <Button
  type="submit"
  colorScheme="yellow"
  bg="yellow.400"
  color="black"
  _hover={{bg:"yellow.300"}}
  w="full"
  >{isEdit?"Update Product":"Create Product"}</Button>
    </VStack>


</>
}
export default ProductForm;