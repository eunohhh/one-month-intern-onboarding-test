import { create } from 'zustand';
import { ModalStore } from './types';

const useModalStore = create<ModalStore>((set) => ({
  modalState: {
    isOpen: false,
    children: null,
  },
  openModal: (children) => set({ modalState: { isOpen: true, children } }),
  closeModal: () => set({ modalState: { isOpen: false, children: null } }),
}));

export default useModalStore;
