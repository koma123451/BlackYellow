import { apiRequest } from "./api.js";

// create new order
export const createOrderAPI = async (orderData) =>{


  const {ok,data}=await apiRequest("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  }
  )
  console.log("data",data)
  if (!ok) throw new Error(data?.message || "Order create failed");
  return {success:ok,data:data.order}
}

// get current user's orders
export const fetchOrdersAPI = async () =>{
  const {ok,data}= await apiRequest("/orders/my",{
    method:"GET"
  });
  if (!ok) throw new Error(data?.message || "Order fetch failed");
  return data.orders; // 🔥 return orders list
}
// get single order
export const fetchOrderByIdAPI =async (id) =>{
  const {ok,data}= await apiRequest(`/orders/${id}`,{
    method:"GET"
  });
    if (!ok) throw new Error(data?.message || "Order not found");
    console.log("orderbyiddata",data.order)
  return data.order; // 🔥 return single order
}
// admin only get all orders
export const fetchAllOrdersAPI = async () => {
  const { ok, data } = await apiRequest(`/orders`,{
    method:"GET"
  });
  if (!ok) throw new Error(data?.message || "Admin fetch failed");
  return data.orders;
};