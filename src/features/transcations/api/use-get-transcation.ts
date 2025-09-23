import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useTransaction = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transcation", { id }],
    queryFn: async () => {
      const res = await client.api.transcations[":id"].$get({ param: { id } });
      if (!res.ok) {
        throw new Error("Failed to get the data");
      }
      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
