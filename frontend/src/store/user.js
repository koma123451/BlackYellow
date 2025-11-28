import {create} from 'zustand'
import {registerUser,loginUser,getMe,logout as logoutAPI} from '../services/auth.js'


export const useUserStore = create((set)=>({
  
  user:null,
  loading:true,
  login:async(email,password)=>{
    
    const data =await loginUser({email,password})
   
    if(data.message) return alert(data.message);

    set({user:data})
    return true
  },
  register:async(username,email,password)=>{
    console.log("store register args:", username, email, password);

    const data =await registerUser({username,email,password})
    console.log(data)
    set({user:data})
  },
  logout:async()=>{
    console.log("before logoutAPI")
    await logoutAPI()
    set({user:null})
    console.log("user")
    setTimeout(() => {
    // window.location.href = "/login";
    
  }, 1000); // 150–300ms安全区
  },
  checkAuth:async()=>{
    try{
    const data = await getMe();
    if(data?.id) set ({user:data})
 }
  finally{
    set({loading:false})
  }
    }
}))

