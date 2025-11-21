import {useState} from 'react';
import {useUserStore} from '../store/user.js';
import { Box, VStack } from '@chakra-ui/react';
import LoginForm from '../components/user/LoginForm.jsx'
import { useNavigate } from "react-router-dom";

export default function Login(){
  const navigate = useNavigate();
  const login = useUserStore((state)=>state.login);
  const [form,setForm]=useState({username:"",password:"",email:""})
  const submit = async (e)=>{
    e.preventDefault();
    const success= await login(form.email,form.password);
    console.log("success",success)
    if(success) navigate("/Cart")
  }
  const onChange = (e)=>{
    const {name,value}=e.target;
    setForm(prev=>({...prev,[name]:value}))
  }

return <>
<Box bg="black" color="white" minH="100vh" py={10}> 
<LoginForm
form={form}
handleSubmit={submit}
handleChange={onChange}
></LoginForm>
</Box>



</>

}