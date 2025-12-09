import { Box } from "@chakra-ui/react";
import ProductForm from '../components/product/ProductForm.jsx';
import { getProductById, apiRequest } from '../services/api.js';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function EditPage(){

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading,setLoading] = useState(true);
  const [product,setProduct] = useState(null);

  // 🔥 组件加载时直接从后端获取
  useEffect(()=>{
    (async()=>{
      const {ok,data} = await getProductById(id);   
      if(ok && data){
        setProduct(data.data);
      }
      setLoading(false);
    })();
  },[]);

  // 🔥 input 修改
  const handleChange = (e)=>{
    setProduct(prev=>({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // 🔥 提交更新到后端
  async function handleSubmit(e){
    e.preventDefault();

    const {ok} = await apiRequest(`/products/${id}`,{
      method:"PUT",
      body: JSON.stringify(product)
    });

    if(ok){
      navigate("/AdminProducts");  // ← 返回后台列表
    }
  }

  if(loading) return <Box color="white">Loading...</Box>

  return(
    <Box bg="black" color="white" minH="100vh" py={10}>
      <ProductForm
        product={product}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEdit={true}
      />
    </Box>
  );
}
