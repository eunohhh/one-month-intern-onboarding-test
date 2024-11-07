export type ModalType = 'error' | 'success' | null;

export type ModalValue = {
  type: ModalType;
  message: string;
};

export type ModalState = {
  isOpen: boolean;
  value: ModalValue;
};

export type ModalStore = {
  modalState: ModalState;
  openModal: (value: ModalValue) => void;
  closeModal: () => void;
};
