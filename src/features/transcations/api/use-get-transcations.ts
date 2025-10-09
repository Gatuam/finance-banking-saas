// src/features/transactions/api/use-get-transactions.ts
import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetTranscations = (from: string, to: string, accountId: string) => {
  return useQuery({
    queryKey: ["transactions", { from, to, accountId }],
    queryFn: async () => {
      const res = await client.api.transcations.$get({
        query: { from, to, accountId },
      });
      if (!res.ok) throw new Error("Failed to get data");
      const { data } = await res.json();
      return data;
    },
  });
};
