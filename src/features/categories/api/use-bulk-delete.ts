import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.categories)["bulik-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.categories)["bulik-delete"]["$post"]
>;

export const useBulkDeleteCategory= () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (ids) => {
      const res = await client.api.categories["bulik-delete"]["$post"](ids);
      if (!res.ok) {
        throw new Error("Failed to delete bulk categories");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("categories are deleted!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to Delete categories");
    },
  });
  return mutation;
};
