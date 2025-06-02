import { useApi } from "./useApi";
import { PaginationParams, PaginatedResponse } from "../types";

interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties
}

export function useUsers() {
  const baseConfig = {
    url: "/api/users",
  };

  const listUsers = useApi<PaginatedResponse<User>>({
    ...baseConfig,
    method: "GET",
  });

  const getUser = useApi<User>({
    ...baseConfig,
    method: "GET",
  });

  const createUser = useApi<User>({
    ...baseConfig,
    method: "POST",
  });

  const updateUser = useApi<User>({
    ...baseConfig,
    method: "PUT",
  });

  const deleteUser = useApi<void>({
    ...baseConfig,
    method: "DELETE",
  });

  return {
    listUsers: (params?: PaginationParams) => listUsers.execute({ params }),
    getUser: (id: string) =>
      getUser.execute({ url: `${baseConfig.url}/${id}` }),
    createUser: (data: Omit<User, "id">) => createUser.execute({ data }),
    updateUser: (id: string, data: Partial<User>) =>
      updateUser.execute({ url: `${baseConfig.url}/${id}`, data }),
    deleteUser: (id: string) =>
      deleteUser.execute({ url: `${baseConfig.url}/${id}` }),
  };
}

// Example usage:
/*
function UserManagement() {
  const { listUsers, createUser, updateUser, deleteUser } = useUsers();
  
  useEffect(() => {
    listUsers({ page: 1, limit: 10 });
  }, []);

  const handleCreate = async (userData: Omit<User, 'id'>) => {
    await createUser(userData);
  };

  // ... rest of the component
}
*/
