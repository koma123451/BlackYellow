import { useEffect, useState } from "react";
import { Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {apiRequest} from '../services/api.js'

export default function AdminProducts(){

  const [products, setProducts] = useState([]);
  const nav = useNavigate();
  useEffect(()=>{
    load();
  },[]);

  async function load(){
    const {ok,data} = await apiRequest("/products");  // 后端已有 getProducts
    console.log(ok)
    if(ok) setProducts(data.data);
    console.log(typeof(products))
  }

  return(
    <Box bg="gray.900" minH="100vh" color="white" p={10}>
      <Heading mb={6} color="yellow.400">Manage Products</Heading>

      <Button colorScheme="yellow" mb={6} onClick={()=>nav("/CreatePage")}>
        ➕ Create New Product
      </Button>

      <Table variant="simple" colorScheme="yellow">
        <Thead>
          <Tr>
            <Th color="yellow.300">Name</Th>
            <Th color="yellow.300">Price</Th>
            <Th color="yellow.300">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map(p=>(
            <Tr key={p._id}>
              <Td>{p.name}</Td>
              <Td>${p.price}</Td>
              <Td>
                <Button size="sm" mr={2} onClick={()=>nav(`/EditPage/${p._id}`)}>Edit</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

    </Box>
  );
}
