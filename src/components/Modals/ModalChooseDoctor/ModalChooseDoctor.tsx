import React from 'react';

import AvatarImg from 'assets/img/news/avatar.jpg';
import { useModalsStore } from 'store/useModalsStore';
import { Avatar, Icon, Input, Modal } from 'ui-kit';
import './ModalChooseDoctor.scss';

export const ModalChooseDoctor = () => {
  const isShowModal = useModalsStore((state) => state.isChooseDoctor);
  const changeShowModal = useModalsStore((state) => state.handleChooseDoctor);

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalDoctor'>
        <div
          className='ModalDoctor__Close'
          onClick={() => changeShowModal(false)}
        >
          <Icon type='Close' />
        </div>
        <div className='ModalDoctor__Content'>
          <h3>Выбрать врача</h3>
          <Input
            className='ModalDoctor__Input'
            placeholder='Введите имя или фамилию'
          />

          <div className='ModalDoctor__Main'>
            <div className='ModalDoctor__Block'>
              <Avatar className='ModalDoctor__Avatar' image={AvatarImg} />
              <div className='ModalDoctor__Info'>
                <h3>Пушкина Александра Сергеевна</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
