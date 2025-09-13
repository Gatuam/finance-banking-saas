import React from "react";
import { HeaderLogo } from "./header-logo";
import { Nav } from "./nav";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../global/theme-toggle";
import { Loader } from "lucide-react";
import { WelcomeMessage } from "./welcome-message";

interface Props {}

const Headrer = () => {
  return (
    <header className=" bg-gradient-to-b from-accent/50 to-accent/20 backdrop-blur-2xl border-b border-accent/80 px-4 py-6 lg:px-14 pb-36">
      <div className="max-w-7xl mx-auto">
        <div className=" w-full flex items-center justify-between mb-14">
          <div className=" flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Nav />
          </div>
          <div className=" flex gap-x-3 items-center justify-center">
            <ClerkLoading>
              <Loader className=" animate-spin" />
            </ClerkLoading>
            <ClerkLoaded>
              <UserButton />
            </ClerkLoaded>
            <ModeToggle />
          </div>
        </div>
        <WelcomeMessage />
      </div>
    </header>
  );
};

export default Headrer;
