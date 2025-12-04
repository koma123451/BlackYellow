import { useParams } from "react-router-dom";
import { useOrderStore } from "../store/order";
import { useEffect } from "react";
import { Box, Text, VStack, Divider } from "@chakra-ui/react";

export default function OrderDetail() {
  const { id } = useParams();
  const { currentOrder, fetchOrderById } = useOrderStore();
 console.log(id)

  useEffect(() => {
    fetchOrderById(id);           // 🔥 根据ID获取订单详细
  }, [id]);
 console.log("currentorders",currentOrder)
  if (!currentOrder) return <Text color="white">Loading Order...</Text>;

 return (
  <Box bg="gray.900" minH="100vh" color="white" py={14} px={6}>
    
    <VStack spacing={3} textAlign="center">
      <Text fontSize="4xl" fontWeight="bold" color="yellow.400">Order Successful</Text>
      <Text fontSize="md" color="gray.300">Thank you for your purchase</Text>
      <Text fontSize="sm" color="yellow.300">Order ID: {currentOrder._id}</Text>
    </VStack>

    {/* CONTENT WRAP */}
    <Box 
      maxW="850px" mx="auto" mt={10} 
      bg="gray.800" p={10} rounded="lg" boxShadow="xl"
      border="1px solid rgba(255,255,0,0.15)"
    >

      {/* ITEMS LIST */}
      <Text fontSize="2xl" color="yellow.300" fontWeight="bold" mb={4}>Items Purchased</Text>

      <VStack spacing={4} align="stretch">
        {currentOrder.items.map(i => (
          <Box 
            key={i._id}
            p={4}
            rounded="md"
            bg="gray.700"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            _hover={{ bg: "gray.600", transform:"scale(1.02)", transition:"0.2s" }}
          >
            <Text fontSize="lg">{i.productId.name}</Text>
            <Text fontSize="md">x {i.quantity}</Text>
            <Text fontSize="lg" color="yellow.300">
              ${(i.productId.price * i.quantity).toFixed(2)}
            </Text>
          </Box>
        ))}
      </VStack>

      <Divider my={8} borderColor="gray.600" />

      {/* SUMMARY */}
      <VStack spacing={2} align="flex-end">
        <Text fontSize="lg" color="gray.300">Subtotal: ${currentOrder.subtotal.toFixed(2)}</Text>
        <Text fontSize="lg" color="gray.300">Tax: ${currentOrder.tax.toFixed(2)}</Text>
        <Text fontSize="2xl" color="yellow.300" fontWeight="bold">
          Total Paid: ${currentOrder.total.toFixed(2)}
        </Text>
      </VStack>

    </Box>

  </Box>
);

}
