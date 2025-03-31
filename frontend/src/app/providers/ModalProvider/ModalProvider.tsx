import { AuthModal } from '@/features/Auth';
import { useState, useEffect } from 'react';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    console.warn('ModalProvider: Not mounted yet');
    return null;
  }

  return (
    <>
      <AuthModal />
    </>
  );
};
