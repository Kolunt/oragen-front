import React from 'react';
import { useModalsStore } from 'store/useModalsStore';
import { Icon, Modal } from 'ui-kit';
import './ModalAddApplication.scss';

export const ModalAddApplication = () => {
  const isShowModal = useModalsStore((state) => state.isApplication);
  const changeShowModal = useModalsStore((state) => state.handleApplication);
  const showModalContact = useModalsStore((state) => state.handleContact);
  const showModalOrganization = useModalsStore(
    (state) => state.handleOrganization
  );

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddApplication'>
        <h3 className='ModalAddApplication__Header'>Заявка</h3>

        <div
          className='ModalAddApplication__Item'
          onClick={() => showModalContact(true)}
        >
          <div className='ModalAddApplication__Icon'>
            <Icon type='FooterPerson' />
          </div>
          <p>Контакт</p>
        </div>

        <div
          className='ModalAddApplication__Item'
          onClick={() => showModalOrganization(true)}
        >
          <div className='ModalAddApplication__Icon'>
            <Icon type='FooterBag' />
          </div>
          <p>Организация</p>
        </div>
      </div>
    </Modal>
  );
};
