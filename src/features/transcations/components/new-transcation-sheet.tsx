"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewtransaction } from "../hooks/use-new-transaction";
import { insertTransactionSchema } from "@/db/schema";
import z from "zod";
import { useCreateTranscation } from "../api/use-create-transcation";
import { toast } from "sonner";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateAccount } from "@/features/accounts/api/use-create-accont";
import { useGetAcconts } from "@/features/accounts/api/use-get-accounts";

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValue = z.input<typeof formSchema>;

export const NewTranscationSheet = () => {
  const categoryMutation = useCreateCategory();
  const categoryQuery = useGetCategories();
  const onCreateCategory = (name: string) =>
    categoryMutation.mutate({
      name,
    });

  const categoryOptions = (categoryQuery.data ?? []).map((cat) => ({
    lable: cat.name,
    value: cat.id,
  }));

  const accountMutation = useCreateAccount();
  const accountQuery = useGetAcconts();
  const onCreateAccount = (name: string) =>
    accountMutation.mutate({
      name,
    });

  const accountOptions = (accountQuery.data ?? []).map((cat) => ({
    lable: cat.name,
    value: cat.id,
  }));

  const { isOpen, onClose } = useNewtransaction();
  const mutation = useCreateTranscation();
  const onSubmit = (values: FormValue) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
        toast.success("Created");
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className=" flex flex-col items-center">
          <SheetTitle>New transcation</SheetTitle>
          <SheetDescription className="pb-3 text-center">
            Create a new transaction!
          </SheetDescription>
          <div className=" px-2 pt-4 pb-4 border border-accent-foreground/10 rounded-md w-full">
            <div className=" gap-3 p-2 w-full">form</div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
