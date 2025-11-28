// import {apiRequest} from "./api.js"
// //
// export const registerUser = async ({username,email,password})=>{
//   //console.log("username at auth.js",username)
//   const res = await fetch('/api/auth/register',{
//     method:"POST",
//     credentials:"include",//必须，让浏览器带cookie
//     headers:{"Content-type":"application/json"},
//     body:JSON.stringify({username,email,password})
//   })
//   return await res.json();
// }
// export const loginUser = async({email,password})=>{
//   const res = await fetch('/api/auth/login',{
//     method:"POST",
//     credentials:"include",
//     headers:{"Content-type":"application/json"},
//     body:JSON.stringify({email,password})
//   })
//   return res.json();
// }
// //获取当前用户，用于页面刷新保持登录状态
// export const getMe = async()=>{
//   const res = await fetch ('/api/auth',{
//     method:"GET",
//     credentials:"include",
//   })
//   if (!res.ok) {
//     // 未登录或服务器错，直接返回 null，不要 json()
//     return null;
//   }

//   try {
//     return await res.json();
//   } catch {
//     return null;
//   }
// }
// export const logout = async()=>{
//   const res = await fetch ('/api/auth/logout',{
//     method:"POST",
//     credentials:"include",
//   })
//   return await res.json()
// }

import { apiRequest } from "./api.js";

// Register
export const registerUser = async ({ username, email, password }) => {
  const { ok, data } = await apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
  return ok ? data : null;
};

// Login
export const loginUser = async ({ email, password }) => {
  const { ok, data } = await apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return { success: ok, user: data };
};

// Get current user (keep login on refresh)
export const getMe = async () => {
  const { ok, data } = await apiRequest("/api/auth");
  return ok ? data : null;
};

// Logout
export const logout = async () => {
  const { ok } = await apiRequest("/api/auth/logout", { method: "POST" });
  
  return ok;
};
