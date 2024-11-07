import { create } from 'zustand';
import { ModalStore } from './types';

const useModalStore = create<ModalStore>((set) => ({
  modalState: {
    isOpen: false,
    value: {
      type: null,
      message: '',
    },
  },
  openModal: (value) => set({ modalState: { isOpen: true, value } }),
  closeModal: () => set({ modalState: { isOpen: false, value: { type: null, message: '' } } }),
}));

export default useModalStore;
