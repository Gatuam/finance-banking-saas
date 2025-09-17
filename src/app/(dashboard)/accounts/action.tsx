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
interface Props {
  id: string;
}
export const Actions = ({ id }: Props) => {
  const { onOpen } = useOpenAccount();
  return (
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
        {/* <DropdownMenuItem
        onClick={()=> {}}
        variant="destructive">
             <Trash className=" size-4"/> Delete
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
