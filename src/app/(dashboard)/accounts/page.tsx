"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useNewAccount } from "@/features/accounts/hooks/use-newaccount";
import { columns, Payment } from "./columns";
import { DataTable } from "@/components/global/data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "a@example.com",
  },
];

const Page = () => {
  const newAccount = useNewAccount();
  return (
    <>
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-35 ">
        <Card className=" border-none border-0 drop-shadow-md">
          <CardHeader className="  gap-y-2 lg:flex lg:items-center lg:justify-between">
            <CardTitle className=" text-xl line-clamp-1 text-center">
              Account
            </CardTitle>
            <Button onClick={newAccount.onOpen} className=" text-accent">
              <PlusIcon className=" size-4" />
              Add new
            </Button>
            
          </CardHeader>
          <CardContent>
              <DataTable filterKey={'email'} columns={columns} data={data} />
            </CardContent>
        </Card>
      </div>
      <div></div>
    </>
  );
};

export default Page;
