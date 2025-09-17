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
import { useCreateAccount } from "../api/use-create-accont";
import { toast } from "sonner";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccont } from "../api/use-get-account";
import { Loader } from "lucide-react";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValue = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const [mouthed, setMounted] = useState(false);
  const { isOpen, onClose, onOpen, id } = useOpenAccount();

  const accountQuery = useGetAccont(id);
  const isLoading = accountQuery.isLoading;
  const mutation = useCreateAccount();
  const defaultValue = accountQuery.data
    ? {
        name: accountQuery.data.name,
      }
    : {
        name: "lee",
      };
  const onSubmit = (values: FormValue) => {
    console.log(values);
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
        toast.success("Created");
      },
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mouthed) return null;

  return (
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
                <>
                  <Loader className=" animate-spin" />
                </>
              ) : (
                <>
                  <AccountForm
                  id={id}
                    defaultValues={defaultValue}
                    onSubmit={onSubmit}
                    disable={mutation.isPending}
                  />
                </>
              )}
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
