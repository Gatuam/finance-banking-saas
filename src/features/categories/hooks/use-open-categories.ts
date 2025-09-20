import { create } from "zustand";

type Props = {
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
  id?: string
};

export const useOpenCategories = create<Props>((set) => ({
  id : undefined,
    isOpen: false,
  onClose: () => set({ isOpen: false, id: undefined }),
  onOpen: (id: string) => set({ isOpen: true, id }),
}));
