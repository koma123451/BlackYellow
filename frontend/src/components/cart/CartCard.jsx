import { Box, HStack, VStack, Image, Text, Button } from "@chakra-ui/react";

const CartCard = ({ item, onRemove,onIncrease,onDecrease }) => {
console.log("🟢 Button rendered:", item);
const product = item.productId; // <-- 解构
  const quantity = item.quantity;
  return (
    <Box
      bg="gray.900"
      borderRadius="lg"
      boxShadow="lg"
      p={4}
      w="full"
      _hover={{ transform: "scale(1.02)", boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" }}
      transition="all 0.3s ease"
    >
      <HStack justify="space-between" align="center" w="full" spacing={6}>
        {/* 左边图片 */}
        <Image
          src={product.image}
          alt={product.name}
          boxSize="80px"
          borderRadius="md"
          objectFit="cover"
          border="2px solid"
          borderColor="yellow.400"
        />

        {/* 中间信息 */}
        <VStack align="start" spacing={1} flex="1">
          <Text fontWeight="bold" color="yellow.300" fontSize="lg">
            {product.name}
          </Text>
          <Text color="gray.400" fontSize="sm">
            {product.brand}
          </Text>
          <Text color="white" fontSize="md">
            {product.price}
          </Text>
        </VStack>

        {/* 右边删除按钮 */}
        <HStack spacing={3} align="center">
          <Button size="sm" bg="gray.700" onClick={onDecrease}>-</Button>
          <Text>{quantity}</Text>
          <Button size="sm" bg="gray.700" onClick={onIncrease}>+</Button>
        <Button
          colorScheme="red"
          size="sm"
          bg="red.500"
          _hover={{ bg: "red.400" }}
          onClick={onRemove}
          
        >
          Remove
        </Button>
        </HStack>
      </HStack>
    </Box>
  );
};

export default CartCard;
