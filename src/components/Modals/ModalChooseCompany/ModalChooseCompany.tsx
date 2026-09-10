import React from 'react';

import Logo from 'assets/img/MedicalCross.jpg';
import { useModalsStore } from 'store/useModalsStore';
import { Avatar, Icon, Input, Modal } from 'ui-kit';
import './ModalChooseCompany.scss';

export const ModalChooseCompany = () => {
  const isShowModal = useModalsStore((state) => state.isChooseCompany);
  const changeShowModal = useModalsStore((state) => state.handleChooseCompany);

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalChooseCompany'>
        <div
          className='ModalChooseCompany__Close'
          onClick={() => changeShowModal(false)}
        >
          <Icon type='Close' />
        </div>
        <div className='ModalChooseCompany__Content'>
          <h3>Выбрать организацию</h3>
          <Input
            className='ModalChooseCompany__Input'
            placeholder='Введите название'
          />

          <div className='ModalChooseCompany__Main'>
            <div className='ModalChooseCompany__Block'>
              <Avatar className='ModalChooseCompany__Avatar' image={Logo} />
              <div className='ModalChooseCompany__Info'>
                <h3>МедГуру</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
