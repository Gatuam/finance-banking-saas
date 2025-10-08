import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transcations.$post>;
type RequestType = InferRequestType<
  typeof client.api.transcations.$post
>["json"];

export const useCreateTranscation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.transcations.$post({ json });
      if (!res.ok) {
        throw new Error("Failed to create transcation");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Transcation created");
      queryClient.invalidateQueries({ queryKey: ["transcations"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });
  return mutation;
};
