import { cn } from "@/lib/utils";
import { Info, MinusCircle, PlusCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface AmountInputProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disable?: boolean;
}

const AmountInput: React.FC<AmountInputProps> = ({
  value,
  onValueChange,
  placeholder,
  disable,
}) => {
  const parseValue = parseFloat(value || "0");
  const isIncome = parseValue > 0;
  const isExpense = parseValue < 0;

  const onReverseValue = () => {
    const newValue = parseFloat(value || "0") * -1;
    onValueChange(newValue.toString());
  };

  return (
    <div className="relative flex justify-center items-center gap-x-4 bg-accent px-1 rounded-md">
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            type="button"
            onClick={onReverseValue}
            variant="default"
            className={cn(
              " flex items-center justify-center h-6",
              isIncome && "bg-emerald-600 hover:bg-emerald-600",
              isExpense && "bg-red-500 hover:bg-red-600 text-accent"
            )}
          >
            {parseValue === 0 && <Info className="size-2.5 text-accent" />}
            {isIncome && (
              <PlusCircle className="size-2.5 text-accent-foreground" />
            )}
            {isExpense && (
              <MinusCircle className="size-2.5 text-accent-foreground" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Use [+] for income and [-] for expense</p>
        </TooltipContent>
      </Tooltip>
      <div className=" relative flex justify-center items-center flex-1">
        <p className=" absolute left-0">$</p>
        <Input
          value={value || ""}
          placeholder={placeholder}
          disabled={disable}
          className="w-full !border-none !ring-0 !bg-none !bg-transparent"
          onChange={(e) => onValueChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default AmountInput;
