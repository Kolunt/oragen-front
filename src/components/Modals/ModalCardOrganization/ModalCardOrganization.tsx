import React from 'react';

import { CardOrganization } from 'components';
import { useModalsStore } from 'store/useModalsStore';
import { Modal } from 'ui-kit';
import './ModalCardOrganization.scss';

export const ModalCardOrganization = () => {
  const isShowModal = useModalsStore((state) => state.isCardOrganization);
  const changeShowModal = useModalsStore(
    (state) => state.handleCardOrganization
  );

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <CardOrganization />
    </Modal>
  );
};
