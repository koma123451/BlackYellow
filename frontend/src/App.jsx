import { Box, Text, Button } from "@chakra-ui/react";
import React from "react";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage"
import Cart from "./pages/Cart"
import EditPage from "./pages/EditPage";
import Login from "./pages/Login"
import Rigister from './pages/Register'
import ProductDetail from './pages/ProductDetail.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import OrderDetail from './pages/OrderDetail.jsx'
import {useUserStore} from './store/user.js'
import {useEffect} from 'react'


function App() {
  const {checkAuth,loading} = useUserStore()
  useEffect(()=>{
    checkAuth();
  },[])

if(loading) return <p>Loading</p>

  return (
  <>

  <Navbar/>
<Routes>
  <Route path="/" element={<HomePage/>}></Route>
   
  <Route path="/CreatePage" element={<CreatePage/>}></Route>
  <Route path="/CheckoutPage" element={<CheckoutPage/>}></Route>
  <Route path="/products/:id" element={<ProductDetail/>}></Route>
  <Route path="/orders/:id" element={<OrderDetail />} />
  <Route path="/Cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}></Route>
  <Route path="/EditPage/:id" element={<EditPage/>}></Route>
  <Route path="/Login" element={<Login/>}></Route>
  <Route path="/Register" element={<Rigister/>}></Route>
</Routes>
<Footer></Footer>
</>
  );
  
}

export default App;
