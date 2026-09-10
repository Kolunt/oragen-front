import React from 'react';
import { Button, Modal } from 'ui-kit';
import { useModalsStore } from 'store/useModalsStore';
import { useMediaStore } from 'pages/MediaPage/useMediaStore';
import './ModalRemoveFolder.scss';

export const ModalRemoveFolder = () => {
  const isShowModal = useModalsStore((state) => state.isRemoveFolder);
  const changeShowModal = useModalsStore((state) => state.handleRemoveFolder);
  const removeFolder = useMediaStore((state) => state.removeFolder);
  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddFolder'>
        <div className='flex gap-x-10'>
          <Button
            className='ButtonCancel'
            onClick={() => changeShowModal(false)}
          >
            Отмена
          </Button>
          <Button className={'w-full'} onClick={removeFolder}>
            Удалить
          </Button>
        </div>
      </div>
    </Modal>
  );
};
