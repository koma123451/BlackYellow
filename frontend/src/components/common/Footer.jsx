import { Box, Text, VStack, HStack, Link, Icon, Divider } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="gray.900" color="gray.300" py={10} px={[6, 12]}>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between" align={["start", "center"]} flexDir={["column", "row"]}>
          {/* 左边 Logo & 名称 */}
          <VStack align="start" spacing={2}>
            <Text fontSize="2xl" fontWeight="bold" color="yellow.400">
              BlackYellow Keyboards
            </Text>
            <Text fontSize="sm" color="gray.500">
              Built for performance. Designed for passion.
            </Text>
          </VStack>

          {/* 中间链接 */}
          <HStack spacing={6}>
            {["Home", "Products", "About", "Contact"].map((link) => (
              <Link key={link} href="#" _hover={{ color: "yellow.400" }}>
                {link}
              </Link>
            ))}
          </HStack>

          {/* 右边社交媒体图标 */}
          <HStack spacing={4}>
            <Icon as={FaFacebook} boxSize={5} _hover={{ color: "yellow.400" }} />
            <Icon as={FaTwitter} boxSize={5} _hover={{ color: "yellow.400" }} />
            <Icon as={FaInstagram} boxSize={5} _hover={{ color: "yellow.400" }} />
          </HStack>
        </HStack>

        <Divider borderColor="gray.700" />

        {/* 底部版权 */}
        <Text fontSize="sm" color="gray.500" textAlign="center">
          © {new Date().getFullYear()} BlackYellow Keyboards. All rights reserved.
        </Text>
      </VStack>
    </Box>
  );
};

export default Footer;
