"use client";
import { routes } from "@/const";
import React, { useState } from "react";
import { NavBotton } from "./nav-bottom";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Nav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();
  const onClick = (herf: string) => {
    router.push(herf);
    setOpen(false);
  };
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant={"outline"}
            size={"sm"}
            className=" font-normal !bg-accent-foreground/10 text-accent-foreground border-0"
          >
            <Menu className="size-4" />
            <p className=" text-sm">Menu</p>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className=" px-2 flex flex-col gap-y-3">
          <SheetHeader className=" border-b border-accent-foreground/10">
            <SheetTitle>
              <Button
                variant={"ghost"}
                asChild
                className=" w-full !bg-none px-3 py-3"
              >
                <Link href={"/"}>
                  <Image
                    src={"/logo-bank.svg"}
                    alt="logo"
                    width={20}
                    height={30}
                  />
                  <p className=" text-accent-foreground text-xl font-semibold">
                    NobleBank
                  </p>
                </Link>
              </Button>
            </SheetTitle>
          </SheetHeader>
          <nav>
            {routes.map((route) => (
              <Button
                onClick={() => onClick(route.herf)}
                variant={route.herf === pathname ? "secondary" : "ghost"}
                key={route.label}
                className=" w-full !bg-none flex items-center justify-start !hover:bg-accent-foreground/10 mb-1 "
              >
                <Link href={route.herf}>{route.label}</Link>
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <nav className=" hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route, i) => (
        <NavBotton
          key={route.label}
          href={route.herf}
          label={route.label}
          isActive={pathname === route.herf}
        />
      ))}
    </nav>
  );
};
