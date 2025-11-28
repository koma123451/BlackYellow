import {useState} from 'react';
import {useUserStore} from '../store/user.js';
import { Box, VStack } from '@chakra-ui/react';
import LoginForm from '../components/user/LoginForm.jsx'
import { useNavigate } from "react-router-dom";

const Register = ()=>{
  const register = useUserStore((state)=>state.register)
  const navigate = useNavigate();
  const [form,setForm] = useState({
    username:"",
    email:"",
    password:""
  })
  //console.log("form",form)
  const onChange=(e)=>{
    const {name,value}=e.target;
   // console.log("change:", name, value); // 这里应该每次输入都打印
    setForm(prev=>({...prev,[name]:value}))

  }
  
  const submit=async (e)=>{
    e.preventDefault();
     //console.log("submit form:", form);
   const ok =await register(form.username,form.email,form.password)
   if(ok) navigate("/")
  }
  return <>
  <Box bg="black" color="white" minH="100vh" py={10}> 
  <LoginForm
  form={form}
  handleSubmit={submit}
  handleChange={onChange}
  isRegister={true}
  ></LoginForm>
  </Box>
  </>
}
export default Register