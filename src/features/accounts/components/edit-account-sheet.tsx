"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import z from "zod";
import { toast } from "sonner";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccont } from "../api/use-get-account";
import { Loader } from "lucide-react";
import { useEditAccount } from "../api/use-edit-accont ";
import { useDeleteAccount } from "../api/use-delete-account";
import { UseConfirm } from "@/hooks/use-confirm";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValue = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const [ConfirmDailog, confirm] = UseConfirm(
    "Are you sure?",
    "You ar eabout to delete the data!"
  );
  const [mouthed, setMounted] = useState(false);
  const { isOpen, onClose, onOpen, id } = useOpenAccount();

  const accountQuery = useGetAccont(id);
  const isLoading = accountQuery.isLoading;
  const editMutation = useEditAccount(id);
  const deleteMutation = useDeleteAccount(id);
  const isPending = editMutation.isPending || deleteMutation.isPending;
  const defaultValue = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "",
      };
  const onSubmit = (values: FormValue) => {
    console.log(values);
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mouthed) return null;

  return (
    <>
      <ConfirmDailog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader className=" flex flex-col items-center">
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription className="pb-3 text-center">
              Edit Account details!
            </SheetDescription>
            <div className=" px-2 pt-4 pb-4 border border-accent-foreground/10 rounded-md w-full">
              <div className=" gap-3 p-2 w-full">
                {isLoading ? (
                  <div className=" flex flex-col justify-center -tracking-normal">
                    <div className="space-y-5">
                      <Skeleton className=" max-w-20 h-5" />
                      <Skeleton className=" w-full h-8" />
                      <div className=" space-y-2 pt-2">
                        <Skeleton className=" w-full h-9" />
                        <Skeleton className=" w-full h-9" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <AccountForm
                      id={id}
                      defaultValues={defaultValue}
                      onSubmit={onSubmit}
                      disable={isPending}
                      onDelete={onDelete}
                    />
                  </>
                )}
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
