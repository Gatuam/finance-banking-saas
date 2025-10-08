import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountToMili(amount : number) {
  return Math.round(amount * 1000)
}

export function convertMiliToAmount(amount : number) {
  return Math.round(amount / 1000)
}