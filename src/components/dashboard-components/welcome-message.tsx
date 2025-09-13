"use client";
import { ClerkLoaded, ClerkLoading, useUser } from "@clerk/nextjs";
import React from "react";
import { Skeleton } from "../ui/skeleton";

export const WelcomeMessage = () => {
  const { user, isLoaded } = useUser();
  return (
    <div className=" space-y-2 mb-2 ">
      <h2 className=" text-2xl font-semibold lg:text-4xl text-accent-foreground flex gap-x-2 items-center">
        Welcome Back {isLoaded ? ", " : " "}
        <ClerkLoading>
          <span className=" flex justify-center items-center">
            <Skeleton className=" w-35 h-10 animate-pulse"></Skeleton>
          </span>
        </ClerkLoading>
        <ClerkLoaded>
          <span className=" text-chart-2">{user?.fullName}</span>
        </ClerkLoaded>
      </h2>
      <p className=" tracking-wide lg:text-sm text-accent-foreground text-sm">
        This is your monthly income report!
      </p>
    </div>
  );
};
