'use client'
import React, { ReactElement, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const UseConfirm = (
  title: string,
  message: string
): [() => ReactElement, () => Promise<unknown>] => {
  const [resolver, setResolver] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve, reject) => {
      setResolver({ resolve });
    });
  const hanleClose = () => {
    setResolver(null);
  };

  const handleConfirm = () => {
    resolver?.resolve(true);
    hanleClose();
  };

  const handleCancle = () => {
    resolver?.resolve(false);
    hanleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={resolver !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className=" pt-2">
          <Button onClick={handleCancle} variant={"outline"}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  return [ConfirmationDialog, confirm];
};
