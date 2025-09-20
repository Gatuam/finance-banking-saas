"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import z from "zod";
import { toast } from "sonner";
import { insertCategoriesSchema } from "@/db/schema";
import { useCreateCategory } from "../api/use-create-category";
import { CategoryForm } from "./category-form";
import { useNewCategory } from "../hooks/use-newCategory";

const formSchema = insertCategoriesSchema.pick({
  name: true,
});

type FormValue = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
  const mutation = useCreateCategory();
  const onSubmit = (values: FormValue) => {
    console.log(values);
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
        toast.success("Created");
      },
    });
  };

  const [mouthed, setMounted] = useState(false);
  const { isOpen, onClose } = useNewCategory();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mouthed) return null;
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className=" flex flex-col items-center">
          <SheetTitle>New category</SheetTitle>
          <SheetDescription className="pb-3 text-center">
            Create a new category to track transaction and category!
          </SheetDescription>
          <div className=" px-2 pt-4 pb-4 border border-accent-foreground/10 rounded-md w-full">
            <div className=" gap-3 p-2 w-full">
              <CategoryForm onSubmit={onSubmit} disable={mutation.isPending} />
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
