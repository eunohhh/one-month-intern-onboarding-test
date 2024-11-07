export type ModalState = {
  isOpen: boolean;
  children: React.ReactNode;
};

export type ModalStore = {
  modalState: ModalState;
  openModal: (children: React.ReactNode) => void;
  closeModal: () => void;
};
