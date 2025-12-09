import { 
  Box, Heading, Table, Thead, Tbody, Tr, Th, Td,
  Badge, Button, Select, Collapse, Text, VStack 
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import { useUserStore } from "../store/user";

const STATUS_COLORS = {
  pending: "gray",
  paid: "blue",
  shipped: "yellow",
  delivered: "green",
  cancelled: "red",
};

export default function AdminOrders(){

  const { user } = useUserStore();
  const [orders, setOrders] = useState([]);
  const [loading,setLoading] = useState(true);
  const [statusFilter,setStatusFilter] = useState("all");
  const [openOrderId,setOpenOrderId] = useState(null); // 展开详情用

  if(!user || user.role !== "admin"){
    return (
      <Box color="red.300" textAlign="center" pt={20}>
        <Heading>Access Denied</Heading>
      </Box>
    );
  }

  async function fetchOrders(filterStatus = "all"){
    const query = filterStatus === "all" ? "" : `?status=${filterStatus}`;
    const {ok,data} = await apiRequest(`/orders${query}`);
    if(ok && data?.data){
      setOrders(data.data);
    }
    setLoading(false);
  }

  async function updateStatus(id,newStatus){
    const {ok} = await apiRequest(`/orders/${id}/status`,{
      method:"PATCH",
      body: JSON.stringify({ status:newStatus })
    });
    if(ok){
      // 本地更新
      setOrders(prev => prev.map(o => 
        o._id === id ? { ...o, status:newStatus } : o
      ));
    }
  }

  useEffect(()=>{
    fetchOrders(statusFilter);
  },[statusFilter]);

  if(loading) return <Box color="white">Loading...</Box>;

  return (
    <Box bg="gray.900" color="white" minH="100vh" p={10}>
      <Heading mb={6} color="yellow.400">Admin – Orders</Heading>

      {/* 状态筛选 */}
      <Box mb={4}>
        <Text mb={2}>Filter by status:</Text>
        <Select 
          w="200px" 
          value={statusFilter}
          onChange={e=>setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </Select>
      </Box>

      <Table variant="simple" colorScheme="yellow">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>User</Th>
            <Th>Total</Th>
            <Th>Status</Th>
            <Th>Created</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {orders.map(order=>(
            <>
              <Tr 
                key={order._id}
                _hover={{ bg:"gray.800", cursor:"pointer" }}
                onClick={()=>
                  setOpenOrderId(prev => prev === order._id ? null : order._id)
                }
              >
                <Td>{order._id.slice(-6)}</Td>
                <Td>{order.userId ? order.userId.email : "Guest"}</Td>
                <Td>${order.total.toFixed(2)}</Td>
                <Td>
                  <Badge
                    colorScheme={STATUS_COLORS[order.status] || "gray"}
                    textTransform="capitalize"
                  >
                    {order.status}
                  </Badge>
                </Td>
                <Td>{new Date(order.createdAt).toLocaleString()}</Td>
                <Td>
                  {/* 状态流转按钮 */}
                  {order.status !== "cancelled" && order.status !== "delivered" && (
                    <Button
                      size="sm"
                      mr={2}
                      colorScheme="yellow"
                      onClick={(e)=>{
                        e.stopPropagation(); // 不触发展开
                        let next = order.status;
                        if(order.status === "pending") next = "paid";
                        else if(order.status === "paid") next = "shipped";
                        else if(order.status === "shipped") next = "delivered";
                        updateStatus(order._id,next);
                      }}
                    >
                      Next Status
                    </Button>
                  )}

                  {order.status !== "cancelled" && order.status !== "delivered" && (
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={(e)=>{
                        e.stopPropagation();
                        updateStatus(order._id,"cancelled");
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </Td>
              </Tr>

              {/* 展开订单详情 */}
              <Tr>
                <Td colSpan={6} p={0} border="none">
                  <Collapse in={openOrderId === order._id} animateOpacity>
                    <Box bg="gray.800" p={4}>
                      <Text mb={2} fontWeight="bold">Items:</Text>
                      <VStack align="flex-start" spacing={2}>
                        {order.items.map(item=>(
                          <Box key={item._id}>
                            <Text>
                              {item.productId 
                                ? `${item.productId.name} x ${item.quantity}`
                                : `Product ${item.productId} x ${item.quantity}`
                              }
                            </Text>
                          </Box>
                        ))}
                      </VStack>
                    </Box>
                  </Collapse>
                </Td>
              </Tr>
            </>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
