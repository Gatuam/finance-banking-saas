import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";


interface Props {
  href: string;
  label: string;
  isActive: boolean;
}

export const NavBotton = ({ href, isActive,  label }: Props) => {
    
  return (
    <Button
      asChild
      className={cn(
        "w-full lg:w-auto justify-between font-normal  px-5 hover:bg-accent-foreground/15 hover:text-accent-foreground border-none focus-visible:ring-offset-0 transition-all ease-in  ",
        isActive &&
          " !bg-accent-foreground/20 text-accent-foreground hover:text-primary backdrop-blur-2xl border border-accent-foreground/50"
      )}
      size={"sm"}
      variant={"outline"}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
