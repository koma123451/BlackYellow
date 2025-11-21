//如果没有登录，不允许访问某些页面（Cart...)
import { Navigate } from "react-router-dom";
import {useUserStore} from "../store/user.js"

const ProtectedRoute = ({children})=>{
  const{user,loading} = useUserStore();
  if (loading) return <p>Checking session...</p>;  // 👈 等待 checkAuth 完成
  //如果没有登录，跳去login页面
  if(!user) return <Navigate to="/login"/>
  return children;
}
export default ProtectedRoute;