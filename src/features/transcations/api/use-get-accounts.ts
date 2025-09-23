import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useTranscations = ()=> {
    const query = useQuery({
        queryKey: ['accounts'],
        queryFn: async ()=> {
            const res = await client.api.accounts.$get();
            if(!res.ok){
                throw new Error("Failed to get the data")
            }
            const {data} = await res.json();
            return data
        }
    });
    return query
}