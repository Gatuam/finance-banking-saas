import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetAccont = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["account", { id }],
    queryFn: async () => {
      const res = await client.api.accounts[":id"].$get({ param: { id } });
      if (!res.ok) {
        throw new Error("Failed to get the data");
      }
      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
