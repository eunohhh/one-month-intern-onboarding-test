import Modal from '@/modal/components/Modal';
import { ModalStore } from '@/modal/types';
import useModalStore from '@/modal/zustand';
import { Outlet } from 'react-router-dom';
import { useShallow } from 'zustand/shallow';
import Header from './Header';

function DefaultLayout() {
  const { modalState, closeModal } = useModalStore(
    useShallow((state: ModalStore) => ({
      modalState: state.modalState,
      closeModal: state.closeModal,
    })),
  );

  return (
    <>
      <Modal isModalOpen={modalState.isOpen} onClose={closeModal} value={modalState.value} />
      <section className="flex flex-col min-h-dvh">
        <Header />
        <main
          id="default-layout"
          className="h-full grid place-items-center max-w-screen-lg mx-auto my-0 place-content-center flex-1"
        >
          <Outlet />
        </main>
      </section>
    </>
  );
}

export default DefaultLayout;
