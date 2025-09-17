"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

type FormValue = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValue;
  onSubmit: (values: FormValue) => void;
  onDelete?: () => void;
  disable: boolean;
};

export const AccountForm = ({ disable, onSubmit, id, onDelete , defaultValues }: Props) => {
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name || "",
    },
  });

  const handleDelete = (values: FormValue) => {
    onDelete?.();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input
                  className=" text-sm"
                  disabled={disable}
                  placeholder="e.g cash, bank, CC"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" space-y-2">
          <Button disabled={disable} className=" w-full" type="submit">
            {id ? "Save Changes" : "Create account"}
          </Button>
          {!!id && (
            <Button
              variant={"outline"}
              disabled={disable}
              className=" w-full"
              type="button"
            >
              <Trash />
              Delete account
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
