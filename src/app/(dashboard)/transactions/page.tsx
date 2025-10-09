"use client";

import React, { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader, PlusIcon } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/global/data-table";
import { Skeleton } from "@/components/ui/skeleton";

import { useNewtransaction } from "@/features/transcations/hooks/use-new-transaction";
import { useBulkDeleteTrancations } from "@/features/transcations/api/use-bulk-delete";
import { useGetTranscations } from "@/features/transcations/api/use-get-transcations";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountid") || "";
  const { isOpen, onOpen } = useNewtransaction();
  const TransactionQuery = useGetTranscations(from, to, accountId);
  const deleteTranscations = useBulkDeleteTrancations();
  const transactions = TransactionQuery.data || [];

  const isDisable = TransactionQuery.isLoading || deleteTranscations.isPaused;

  if (TransactionQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-35 ">
        <Card className=" border-none border-0 drop-shadow-md">
          <CardHeader className=" flex items-center justify-between">
            <Skeleton className=" h-8 w-48" />
            <Skeleton className=" h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className=" flex items-center justify-between gap-2">
              <Skeleton className=" h-8 w-96" />
              <Skeleton className=" h-8 w-48" />
            </div>
            <div className=" h-45 w-full flex items-center justify-center ">
              <Skeleton className=" h-40 w-full flex items-center justify-center">
                <Loader className=" size-6 animate-spin" />
              </Skeleton>
            </div>
            <div className=" flex items-center justify-between">
              <Skeleton className=" h-8 w-48" />
              <Skeleton className=" h-8 w-48" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-35 ">
      <Card className=" border-none border-0 drop-shadow-md">
        <CardHeader className="  gap-y-2 lg:flex lg:items-center lg:justify-between">
          <CardTitle className=" text-xl line-clamp-1 text-center">
            Transaction History
          </CardTitle>
          <Button onClick={onOpen} className=" text-accent">
            <PlusIcon className=" size-4" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            disable={isDisable}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTranscations.mutate({ json: { ids } });
            }}
            filterKey="date"
            columns={columns}
            data={transactions}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
