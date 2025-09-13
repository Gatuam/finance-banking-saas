import Image from "next/image";
import Link from "next/link";
import React from "react";

export const HeaderLogo = () => {
  return (
    <Link href={"/"}>
      <div className=" hidden items-center lg:flex gap-3">
        <Image src={"/logo-bank.svg"} alt="logo" width={40} height={30} />
        <p className=" text-accent-foreground text-2xl font-semibold">
          NobleBank
        </p>
      </div>
    </Link>
  );
};
