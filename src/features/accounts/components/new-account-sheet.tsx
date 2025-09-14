"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/use-newaccount";
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import z from "zod";
import { useCreateAccount } from "../api/use-create-accont";
import { toast } from "sonner";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValue = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
  const mutation = useCreateAccount();
  const onSubmit = (values: FormValue) => {
    console.log(values);
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
        toast.success('Created')
      },
    });
  };

  const [mouthed, setMounted] = useState(false);
  const { isOpen, onClose, onOpen } = useNewAccount();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mouthed) return null;
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className=" flex flex-col items-center">
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription className="pb-3 text-center">
            Create a new account to track transaction and account!
          </SheetDescription>
          <div className=" px-2 pt-4 pb-4 border border-accent-foreground/10 rounded-md w-full">
            <div className=" gap-3 p-2 w-full">
              <AccountForm onSubmit={onSubmit} disable={mutation.isPending} />
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
