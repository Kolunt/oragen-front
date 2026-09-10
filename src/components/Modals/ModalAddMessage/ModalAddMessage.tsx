import React from 'react';

import AvatarImg from 'assets/img/news/avatar.jpg';
import { useModalsStore } from 'store/useModalsStore';
import { Avatar, Icon, Input, Modal } from 'ui-kit';
import './ModalAddMessage.scss';

/* const options: ISelectOption[] = [
  { value: '1', label: 'Не выбрано' },               
  { value: '2', label: 'Зубенко Михаил Петрович' },
]; */

export const ModalAddMessage = () => {
  const isShowModal = useModalsStore((state) => state.isMessage);
  const changeShowModal = useModalsStore((state) => state.handleMessage);

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalNewMessage'>
        <div
          className='ModalNewMessage__Close'
          onClick={() => changeShowModal(false)}
        >
          <Icon type='Close' />
        </div>
        <div className='ModalNewMessage__Content'>
          <h3>Написать сообщение</h3>
          <Input
            className='ModalNewMessage__Input'
            placeholder='Введите имя или фамилию'
          />

          <div className='ModalNewMessage__Main'>
            <div className='ModalNewMessage__Block'>
              <Avatar className='ModalNewMessage__Avatar' image={AvatarImg} />
              <div className='ModalNewMessage__Info'>
                <h3>Владислав Рождественский</h3>
                <p>Горздрав</p>
              </div>
            </div>
          </div>

          <div className='ModalNewMessage__Main'>
            <div className='ModalNewMessage__Block'>
              <Avatar className='ModalNewMessage__Avatar' image={AvatarImg} />
              <div className='ModalNewMessage__Info'>
                <h3>Владислав Рождественский</h3>
                <p>Горздрав</p>
              </div>
            </div>
          </div>

          <div className='ModalNewMessage__Main'>
            <div className='ModalNewMessage__Block'>
              <Avatar className='ModalNewMessage__Avatar' image={AvatarImg} />
              <div className='ModalNewMessage__Info'>
                <h3>Владислав Рождественский</h3>
                <p>Горздрав</p>
              </div>
            </div>
          </div>

          <div className='ModalNewMessage__Main'>
            <div className='ModalNewMessage__Block'>
              <Avatar className='ModalNewMessage__Avatar' image={AvatarImg} />
              <div className='ModalNewMessage__Info'>
                <h3>Владислав Рождественский</h3>
                <p>Горздрав</p>
              </div>
            </div>
          </div>

          <div className='ModalNewMessage__Main'>
            <div className='ModalNewMessage__Block'>
              <Avatar className='ModalNewMessage__Avatar' image={AvatarImg} />
              <div className='ModalNewMessage__Info'>
                <h3>Владислав Рождественский</h3>
                <p>Горздрав</p>
              </div>
            </div>
          </div>

          <div className='ModalNewMessage__Main'>
            <div className='ModalNewMessage__Block'>
              <Avatar className='ModalNewMessage__Avatar' image={AvatarImg} />
              <div className='ModalNewMessage__Info'>
                <h3>Владислав Рождественский</h3>
                <p>Горздрав</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
