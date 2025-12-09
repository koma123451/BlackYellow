import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import { useUserStore } from "../store/user";
import { useNavigate } from "react-router-dom";

export default function AdminUsers(){

  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(true);
  const { user } = useUserStore();
  const nav = useNavigate();

  // 🔥 非管理员禁止访问
  if(!user || user.role !== "admin"){
    return <Box color="red" pt={20} textAlign="center"><Heading>Access Denied</Heading></Box>
  }

  // 获取所有用户
  async function fetchUsers(){
    const {ok,data} = await apiRequest("/users");
    if(ok && data?.data) setUsers(data.data);
    setLoading(false);
  }

  // 删除某用户
  async function deleteUser(id){
    if(id===user.id) return alert("不能删除自己！");
    const {ok} = await apiRequest(`/users/${id}`,{method:"DELETE"});
    if(ok) setUsers(prev => prev.filter(u=>u._id!==id));
  }

  // 升级为管理员
  async function makeAdmin(id){
    const {ok} = await apiRequest(`/users/admin/${id}`,{method:"PATCH"});
    if(ok) fetchUsers();
  }

  useEffect(()=>{ fetchUsers(); },[]);

  if(loading) return <Box color="white">Loading...</Box>

  return (
    <Box bg="gray.900" color="white" minH="100vh" p={10}>
      <Heading mb={6} color="yellow.400">Admin – Manage Users</Heading>

      <Table variant="simple" colorScheme="yellow">
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Username</Th>
            <Th>Role</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {users.map(u=>(
            <Tr key={u._id}>
              <Td>{u.email}</Td>
              <Td>{u.username}</Td>

              <Td>
                <Badge
                  colorScheme={u.role==="admin" ? "yellow" : "gray"}
                  fontSize="0.9rem"
                  px={3} py={1} borderRadius="md"
                >
                  {u.role}
                </Badge>
              </Td>

              <Td>
                {u.role!=="admin" && (
                  <Button size="sm" mr={3} colorScheme="green" onClick={()=>makeAdmin(u._id)}>
                    Make Admin
                  </Button>
                )}
                <Button size="sm" colorScheme="red" onClick={()=>deleteUser(u._id)}>
                  Delete
                </Button>
              </Td>

            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
