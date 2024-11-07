import { cn } from '@/ui';
import { PropsWithChildren, useEffect, useState } from 'react';
import { ModalValue } from '../types';

interface ModalProps extends PropsWithChildren {
  isModalOpen: boolean;
  onClose: () => void;
  value: ModalValue;
}

function Modal({ isModalOpen, onClose, value, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      setIsOpen(true);
      setIsOpening(true);
      setTimeout(() => {
        setIsOpening(false);
      }, 300);
    } else {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setIsOpen(false);
      }, 300);
    }
  }, [isModalOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={cn('scroll-lock-layer center-flex z-40 items-end desktop:items-center')}
      onClick={onClose}
    >
      <div
        className={cn(
          'scroll-lock-layer-children center-flex absolute inset-0 isolate bg-slate-500/50 backdrop-blur-sm opacity-100 duration-300 transition-opacity',
          {
            'pointer-events-auto': isOpen,
            'opacity-0': isClosing || isOpening,
          },
        )}
      >
        <section
          className={cn(
            'translate-y-0 center-flex flex-col gap-y-6 desktop:translate-y-0 scroll-lock-layer-children relative isolate max-h-[90%] h-1/4 w-1/4 overflow-x-hidden rounded bg-white desktop:max-h-[calc(100vh-8rem)] desktop:w-[30rem] desktop:rounded-2xl opacity-100 transition-all duration-300',
            {
              'translate-y-4 desktop:translate-y-4 opacity-0': isClosing || isOpening,
            },
          )}
        >
          {value.type === 'error' && (
            <div className="text-red-500 text-center whitespace-pre-wrap">{value.message}</div>
          )}
          {children}
          <button className="bg-slate-400 text-white rounded-md py-1 px-2" onClick={onClose}>
            닫기
          </button>
        </section>
      </div>
    </div>
  );
}

export default Modal;
