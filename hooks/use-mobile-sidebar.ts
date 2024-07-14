import { create } from "zustand";
type useMobileSidebarProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const useMobileSidebar = create<useMobileSidebarProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
