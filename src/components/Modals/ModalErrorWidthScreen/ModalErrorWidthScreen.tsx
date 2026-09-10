import React from 'react';
import { useModalsStore } from 'store/useModalsStore';
import './ModalErrorWidthScreen.scss';

export const ModalErrorWidthScreen = () => {
  const isShowModal = useModalsStore((state) => state.isErrorWidthScreen);

  if (!isShowModal) {
    return null;
  }

  return (
    <div className='ModalErrorWidthScreen'>
      <div className='Content'>
        <p>Ширина Вашего дисплея менее 576px</p>
        <p>Пожалуйста переверните свой гаджет</p>
      </div>
    </div>
  );
};
