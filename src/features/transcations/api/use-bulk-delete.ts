import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.accounts)["bulik-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.accounts)["bulik-delete"]["$post"]
>;

export const useBulkDeleteAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (ids) => {
      const res = await client.api.accounts["bulik-delete"]["$post"](ids);
      if (!res.ok) {
        throw new Error("Failed to delete bulk account");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Accounts are deleted!");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to Delete Account");
    },
  });
  return mutation;
};
