import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.transcations)["bulk-create"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transcations)["bulk-create"]["$post"]
>;

export const useBulkUploadTrancations = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (ids) => {
      const res = await client.api.transcations["bulk-create"]["$post"](ids);
      if (!res.ok) {
        throw new Error("Failed to upload bulk transcations");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Transcations are created!");
      queryClient.invalidateQueries({ queryKey: ["transcations"] });
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to upload transcations");
    },
  });
  return mutation;
};
