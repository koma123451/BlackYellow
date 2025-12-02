import { Box, Text, SimpleGrid, Image, VStack } from "@chakra-ui/react";

const BrandShowcase = ({onBrandSelect}) => {
  const brands = [
    {
      name: "Razer",
      logo: "/Logos/RazerF.png",
    },
    {
      name: "Corsair",
      logo: "/Logos/CorsairF.png",
     
    },
    {
      name: "Keychron",
      logo: "/Logos/KeychronF.jpg",
     
    },
    {
      name: "Logitech",
      logo: "/Logos/LogitechF.png",
      
    },
    {
      name: "Steelseries",
      logo: "/Logos/SteelseriesF.png",
     
    },
    {
      name: "Asus",
      logo: "/Logos/AsusF.png",
     
    },
  ];

  return (
    <Box bg="black" py={12}>
      <VStack spacing={6}>
        <Text
          fontSize={["lg", "2xl"]}
          color="yellow.400"
          fontWeight="bold"
          letterSpacing="1px"
          textAlign="center"
        >
          ⚙️ Trusted by the world’s best keyboard brands
        </Text>

        <SimpleGrid columns={[2, 3, 6]} spacing={[6, 10]} justifyItems="center" w="full">
          {brands.map((brand) => (
            <VStack key={brand.name} spacing={2} cursor="pointer" onClick={()=>onBrandSelect(brand.name)}>
              <Box
                bg="gray.700"
                p={4}
                rounded="md"
                _hover={{
                  transform: "scale(1.08)",
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)",
                }}
                transition="all 0.25s ease-in-out"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  h="50px"
                  objectFit="contain"
                  filter="grayscale(100%)"
                  opacity="0.85"
                  _hover={{ filter: "none", opacity: 1 }}
                  transition="all 0.25s"
                />
              </Box>
              <Text color="gray.300" fontSize="sm" fontWeight="medium">
                {brand.name}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default BrandShowcase;
