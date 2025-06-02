import { useApi } from "./useApi";
import { PaginationParams, PaginatedResponse } from "../types";

// Partner interface definition
export interface Partner {
  id: string;
  name: string;
  type_commerce: string;
  adresse: string;
  email: string;
  ville: string;
  pays: string;
  latitude: number;
  longitude: number;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

// Type for creating a new partner (without server-generated fields)
export type CreatePartnerData = Omit<
  Partner,
  | "id"
  | "status"
  | "createdAt"
  | "updatedAt"
  | "latitude"
  | "longitude"
  | "pays"
> & {
  password: string; // Password is only needed during creation
};

// Type for updating a partner
export type UpdatePartnerData = Partial<
  Omit<Partner, "id" | "email" | "createdAt" | "updatedAt">
>;

export function usePartners() {
  const baseConfig = {
    url: "/partenaire",
  };

  // Get all partners with pagination
  const listPartners = useApi<PaginatedResponse<Partner>>({
    ...baseConfig,
    method: "GET",
  });

  // Get a specific partner by ID
  const getPartner = useApi<Partner>({
    ...baseConfig,
    method: "GET",
  });

  // Create a new partner
  const createPartner = useApi<Partner>({
    ...baseConfig,
    method: "POST",
  });

  // Update an existing partner
  const updatePartner = useApi<Partner>({
    ...baseConfig,
    method: "PUT",
  });

  // Delete a partner
  const deletePartner = useApi<void>({
    ...baseConfig,
    method: "DELETE",
  });

  return {
    // List all partners with optional pagination
    listPartners: (params?: PaginationParams) =>
      listPartners.execute({ params }),

    // Get a specific partner by ID
    getPartner: (id: string) =>
      getPartner.execute({ url: `${baseConfig.url}/${id}` }),

    // Create a new partner
    createPartner: (data: CreatePartnerData) => createPartner.execute({ data }),

    // Update an existing partner
    updatePartner: (id: string, data: UpdatePartnerData) =>
      updatePartner.execute({ url: `${baseConfig.url}/${id}`, data }),

    // Delete a partner
    deletePartner: (id: string) =>
      deletePartner.execute({ url: `${baseConfig.url}/${id}` }),

    // Loading and error states for each operation
    states: {
      list: {
        loading: listPartners.loading,
        error: listPartners.error,
        data: listPartners.data,
      },
      get: {
        loading: getPartner.loading,
        error: getPartner.error,
        data: getPartner.data,
      },
      create: {
        loading: createPartner.loading,
        error: createPartner.error,
        data: createPartner.data,
      },
      update: {
        loading: updatePartner.loading,
        error: updatePartner.error,
        data: updatePartner.data,
      },
      delete: {
        loading: deletePartner.loading,
        error: deletePartner.error,
      },
    },
  };
}

// Example usage:
/*
function PartnerList() {
  const { listPartners, states } = usePartners();
  const { loading, error, data } = states.list;

  useEffect(() => {
    listPartners({ page: 1, limit: 10 });
  }, []);

  if (loading) return <div>Loading partners...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      {data.data.map(partner => (
        <div key={partner.id}>
          <h3>{partner.name}</h3>
          <p>{partner.email}</p>
          <p>Status: {partner.status}</p>
        </div>
      ))}
    </div>
  );
}

function PartnerDetail({ partnerId }: { partnerId: string }) {
  const { getPartner, states } = usePartners();
  const { loading, error, data } = states.get;

  useEffect(() => {
    getPartner(partnerId);
  }, [partnerId]);

  if (loading) return <div>Loading partner details...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <h2>{data.name}</h2>
      <p>Email: {data.email}</p>
      <p>Phone: {data.phone}</p>
      <p>Status: {data.status}</p>
      <p>Created: {new Date(data.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
*/
