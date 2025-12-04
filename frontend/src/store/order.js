import { 
  createOrderAPI, 
  fetchOrdersAPI, 
  fetchOrderByIdAPI,
  fetchAllOrdersAPI 
} from "../services/order.js";
import { create } from "zustand";
export  const useOrderStore = create((set)=>({
  orders:[],
  currentOrder:null,
  loading:false,
  error:null,


// Create Order
  createOrder: async (orderData) => {
    console.log("🟡 createOrder() START", orderData);
    set({ loading: true, error: null });
    try {
      
      const order = await createOrderAPI(orderData);
      console.log("order",order)
      set((state) => ({ orders: [...state.orders, order], loading: false }));
      return order;
    } catch (err) {
      set({ error: err.message, loading: false });
      return null;
    }
  },

  // Fetch current user's order
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await fetchOrdersAPI();
      set({ orders, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // fetch order by id
  fetchOrderById: async (id) => {
    set({ loading: true, error: null });
    try {
      const order = await fetchOrderByIdAPI(id);
      console.log("order.js",order)
      set({ currentOrder: order, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // 🛑 Admin Only
  fetchAllOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await fetchAllOrdersAPI();
      set({ orders, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  }
  



}))
