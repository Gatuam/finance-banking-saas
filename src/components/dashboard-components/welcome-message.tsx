"use client";
import { useUser } from "@clerk/nextjs";
import React from "react";

export const WelcomeMessage = () => {
  const { user, isLoaded } = useUser();
  return (
    <div className=" space-y-2 mb-2 ">
      <h2 className=" text-2xl font-semibold lg:text-4xl text-accent-foreground">
        Welcome Back {isLoaded ? ", " : " "}
        {<span className=" text-chart-2">{user?.fullName}</span>}
      </h2>
      <p className=" tracking-wide lg:text-sm text-accent-foreground text-sm">
        This is your monthly income report!
      </p>
    </div>
  );
};
