import { Box, Heading, SimpleGrid, Button, Text } from "@chakra-ui/react";
import { useUserStore } from "../store/user.js";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard(){

  const { user } = useUserStore();
  const nav = useNavigate();

  // ❗ 非 admin 阻止访问
  if(!user || user.role !== "admin") return (
    <Box color="white" textAlign="center" pt={20}>
      <Heading size="lg" color="red.400">Access Denied</Heading>
      <Text mt={2}>Admin only</Text>
    </Box>
  )

  return(
    <Box bg="gray.900" minH="100vh" color="white" p={10}>
      <Heading mb={8} color="yellow.400">Admin Dashboard</Heading>

      <SimpleGrid columns={[1,3]} spacing={8}>
        
        <Box bg="gray.800" p={6} borderRadius="lg">
          <Heading size="md" mb={3}>Products</Heading>
          <Button w="full" colorScheme="yellow" onClick={()=>nav("/AdminProducts")}>
            Manage Products
          </Button>
        </Box>

        <Box bg="gray.800" p={6} borderRadius="lg">
          <Heading size="md" mb={3}>Orders</Heading>
          <Button w="full" colorScheme="yellow" onClick={()=>nav("/AdminOrders")}>
            View Orders
          </Button>
        </Box>

        <Box bg="gray.800" p={6} borderRadius="lg">
          <Heading size="md" mb={3}>Users</Heading>
          <Button w="full" colorScheme="yellow" onClick={()=>nav("/AdminUsers")}>
            Manage Users
          </Button>
        </Box>
      </SimpleGrid>
    </Box>
  );
}
