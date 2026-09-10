import React, { useCallback, useEffect } from 'react';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { Modal } from 'ui-kit';
import './ModalError.scss';

// выводит сообщения об ошибке
// сейчас не используется
export const ModalError = () => {
  const error = useAuthStore((state) => state.error);
  const setError = useAuthStore((state) => state.setError);

  const changeVisibility = useCallback(() => {
    setError('');
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      changeVisibility();
      clearTimeout(timeoutId);
    }, 4000);
  }, [error]);

  return (
    <Modal
      visibility={!!error}
      changeVisibility={changeVisibility}
      className='ModalError'
    >
      {error && <div>{error}</div>}
    </Modal>
  );
};
