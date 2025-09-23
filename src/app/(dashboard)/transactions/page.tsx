"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader, PlusIcon } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/global/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useNewtransaction } from "@/features/transcations/hooks/use-new-transaction";
import { useBulkDeleteTrancations } from "@/features/transcations/api/use-bulk-delete";

const Page = () => {
  const { isOpen, onOpen, } = useNewtransaction();
  const categoryQuery = useGetCategories();
  const deleteCategory = useBulkDeleteTrancations();
  const categories = categoryQuery.data || [];

  const isDisable = categoryQuery.isLoading || deleteCategory.isPaused;

  if (categoryQuery.isLoading) {
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
    <>
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-35 ">
        <Card className=" border-none border-0 drop-shadow-md">
          <CardHeader className="  gap-y-2 lg:flex lg:items-center lg:justify-between">
            <CardTitle className=" text-xl line-clamp-1 text-center">
              Transcation History
            </CardTitle>
            <Button
              onClick={() => {
                onOpen();
                console.log("lee");
              }}
              className=" text-accent"
            >
              <PlusIcon className=" size-4" />
              Add new
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              disable={isDisable}
              onDelete={(row) => {
                const ids = row.map((r) => r.original.id);
                deleteCategory.mutate({ json: { ids } });
              }}
              filterKey={"name"}
              columns={columns}
              data={categories}
            />
          </CardContent>
        </Card>
      </div>
      <div></div>
    </>
  );
};

export default Page;
