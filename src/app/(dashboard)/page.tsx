'use client'
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-newaccount";

export default function Home() {
    const {onOpen} = useNewAccount();
  return (
    <div>
      <Button onClick={onOpen}>
        Open
      </Button>
    </div>
  );
}
