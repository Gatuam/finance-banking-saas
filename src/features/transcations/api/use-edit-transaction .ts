import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.transcations)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transcations)[":id"]["$patch"]
>["json"];

export const useEditTranscation = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.transcations[":id"]["$patch"]({
        json,
        param: { id },
      });
      if (!res.ok) {
        throw new Error("Failed to edit account");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Account Transcation");
      queryClient.invalidateQueries({ queryKey: ["transcations"] });
      queryClient.invalidateQueries({ queryKey: ["transcation", { id }] });
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });
  return mutation;
};
