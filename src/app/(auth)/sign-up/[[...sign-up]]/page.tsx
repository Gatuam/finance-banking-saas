import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader } from "lucide-react";

export default function Page() {
  return (
    <div className=" min-h-screen flex items-center justify-center space-y-6">
      <div className=" h-full lg:flex flex-col items-center justify-center px-4 space-y-5">
        <div className=" text-center space-y-2 ">
          <h1 className=" font-semibold text-2xl text-accent-foreground">
            Welcome Back
          </h1>
          <p className=" text-sm text-accent-foreground/40">
            Login in to access banking app and start using your app
          </p>
        </div>
        <div className=" flex items-center justify-center">
          <ClerkLoaded>
            <SignUp  />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader className=" animate-spin" />
          </ClerkLoading>
        </div>
      </div>
    </div>
  );
}
