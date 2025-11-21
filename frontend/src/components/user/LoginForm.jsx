import{VStack,Input,Button,Text,Select} from "@chakra-ui/react"

const LoginForm = ({form,handleSubmit,handleChange,isRegister})=>{

return<>
<VStack spacing={5} w={["90%","60%","40%"]} mx="auto" as="form" onSubmit={handleSubmit}>
<Text fontSize="3xl" fontWeight="bold" color="yellow.400">{isRegister?"Rigister":"Login"}</Text>
<Input 
placeholder="Enter User Name"
name="username"
value={form.username}
bg="gray.800"
onChange={handleChange}/>
<Input
placeholder="Enter Password Name"
name="password"
value={form.password}
bg="gray.800"
onChange={handleChange}/>
<Input
placeholder="Enter Email Address"
name="email"
value={form.email}
bg="gray.800"
onChange={handleChange}/>
<Button
type="submit"
  colorScheme="yellow"
  bg="yellow.400"
  color="black"
  _hover={{bg:"yellow.300"}}
  w="full">{isRegister?"Rigister":"Login"}</Button>
</VStack>
</>
}


export default LoginForm;