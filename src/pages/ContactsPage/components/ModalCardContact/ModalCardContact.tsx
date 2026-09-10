import React, { FC } from 'react';

import { CardContact } from 'components';
import { useModalsStore } from 'store/useModalsStore';
import { Modal } from 'ui-kit';
import './ModalCardContact.scss';
import { IContact } from '../../../../store/useContactsStore';

interface IModalCardContactProps {
  informationContact: IContact;
  showModal: boolean;
  onCloseModal: () => void;
}

export const ModalCardContact: FC<IModalCardContactProps> = ({
  informationContact,
  showModal,
  onCloseModal,
}) => {
  return (
    <Modal visibility={showModal} changeVisibility={onCloseModal}>
      <CardContact informationContact={informationContact} />
    </Modal>
  );
};
