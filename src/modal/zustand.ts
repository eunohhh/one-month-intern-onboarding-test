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
  closeModal: () => {
    set((state: ModalStore) => ({ modalState: { ...state.modalState, isOpen: false } }));
    setTimeout(() => {
      set((state: ModalStore) => ({
        modalState: { ...state.modalState, value: { type: null, message: '' } },
      }));
    }, 300);
  },
}));

export default useModalStore;
