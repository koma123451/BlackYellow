import { Box, VStack, HStack, Input, Text, Button } from "@chakra-ui/react";
import { useCart } from "../store/cart.js";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart } = useCart();
  const navigate = useNavigate();

  // 计算小计
  const subtotal = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );
  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  return (
    <Box bg="gray.900" color="white" w="100vw" minH="100vh" py={20}>
      <Text textAlign="center" fontSize="4xl" color="yellow.400">Checkout</Text>

      <HStack w="100%" spacing={10} mt={10} justify="center" align="flex-start">

        {/* Left Form */}
        <VStack bg="gray.800" p={8} borderRadius="lg" spacing={5} w="400px">
          <Text fontSize="xl" color="yellow.300">Shipping Details</Text>
          <Input placeholder="Full Name" bg="gray.700" />
          <Input placeholder="Address" bg="gray.700" />
          <Input placeholder="City" bg="gray.700" />
          <Input placeholder="Postal Code" bg="gray.700" />
          <Input placeholder="Phone Number" bg="gray.700" />
        </VStack>

        {/* Right Summary */}
        <VStack bg="gray.800" p={8} borderRadius="lg" spacing={5} w="350px">

          <Text fontSize="xl" fontWeight="bold" color="yellow.300">Order Summary</Text>

          <HStack justify="space-between" w="100%">
            <Text>Subtotal</Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </HStack>

          <HStack justify="space-between" w="100%">
            <Text>Tax (13%)</Text>
            <Text>${tax.toFixed(2)}</Text>
          </HStack>

          <Box borderBottom="1px" borderColor="gray.600" w="100%" />

          <HStack justify="space-between" w="100%">
            <Text fontSize="lg" fontWeight="bold" color="yellow.300">Total</Text>
            <Text fontSize="lg" fontWeight="bold" color="yellow.300">${total.toFixed(2)}</Text>
          </HStack>

          <Button colorScheme="yellow" w="100%" mt={3}>
            Place Order
          </Button>

        </VStack>
      </HStack>
    </Box>
  );
}
