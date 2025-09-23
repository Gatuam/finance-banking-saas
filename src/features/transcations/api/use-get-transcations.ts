import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useTranscations = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountid") || "";

  const query = useQuery({
    queryKey: ["transcations", { from, to, accountId }],
    queryFn: async () => {
      const res = await client.api.transcations.$get({
        query: {
          from,
          to,
          accountId,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to get the data");
      }
      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
