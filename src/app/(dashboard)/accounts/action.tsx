"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";
import { UseConfirm } from "@/hooks/use-confirm";
interface Props {
  id: string;
}
export const Actions = ({ id }: Props) => {
  const { onOpen, onClose } = useOpenAccount();
  const deleteMutation = useDeleteAccount(id);
  const [ConfirmationDialog, confirm] = UseConfirm(
    "Are you sure?",
    "You are about to delete this data"
  );
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
  return (
    <>
      <ConfirmationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className=" size-5 p-0">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Edit Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onOpen(id)}>
            <Edit className=" size-4" /> Edit
          </DropdownMenuItem>
           <DropdownMenuItem
        onClick={onDelete}
        variant="destructive">
             <Trash className=" size-4"/> Delete
        </DropdownMenuItem> 
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
