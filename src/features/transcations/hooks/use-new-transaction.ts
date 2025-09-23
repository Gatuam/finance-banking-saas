import { create } from "zustand";

type Newtransaction = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewtransaction = create<Newtransaction>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
