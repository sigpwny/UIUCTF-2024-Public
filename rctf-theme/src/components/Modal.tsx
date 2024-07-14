import { useEffect, useState } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ANIMATION_DURATION = 200;

export default function Modal({ open, onClose, children }: ModalProps) {
  const [isLinger, setIsLinger] = useState(open);
  useEffect(() => {
    if (open) {
      setIsLinger(true);
    } else {
      const timer = setTimeout(() => {
        setIsLinger(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    function listener (e: any) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (open) {
      document.addEventListener('keyup', listener)
      return () => document.removeEventListener('keyup', listener)
    }
  }, [open, onClose])

  return open || isLinger ? (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div
        className="fixed top-0 bottom-0 left-0 right-0 z-50 pointer-events-none modal-fade-in"
        role="document"
      >
        <div className="max-w-prose mx-auto overflow-y-auto custom-scrollbar max-h-screen pointer-events-auto">
          {children}
        </div>
      </div>
    </>
  ) : null;
}