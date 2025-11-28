import { Box, Flex, Text, Button, HStack} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {useUserStore} from "../../store/user.js"
import { useNavigate } from "react-router-dom";
function Navbar() {
  const {user,logout}= useUserStore();
  console.log(user)
const navigate = useNavigate();

  return (
    <Box bg="brand.gray" px={8} py={4} shadow="md">
      <Flex justify="space-between" align="center">
        {/* Logo */}
        <Text fontSize="2xl" fontWeight="bold" color="brand.orange" as={Link} to="/">
          BlackYello 🖤🟡
        </Text>

        {/* 按钮组 */}
        <HStack spacing={4}>
          <Button variant="solid" as={Link} to="/">Home</Button>
          <Button variant="solid" as={Link} to="/CreatePage" >Create</Button>
          {/* display Register and login if not logged in */}
            {!user && (
    <>
      <Button as={Link} to="/Register">Register</Button>
      <Button as={Link} to="/Login">Login</Button>
    </>
  )}
        {/* if Logged in- display Cart + username+Logout*/}
        {user && (
    <>
      <Button as={Link} to="/Cart">Cart</Button>
      <Text fontWeight="bold" color="yellow.300">Hi, {user.username}</Text>
      <Button onClick={async () => {
    await logout();   
    navigate("/login"); 
  }}>Logout</Button>
    </>
  )}

        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
