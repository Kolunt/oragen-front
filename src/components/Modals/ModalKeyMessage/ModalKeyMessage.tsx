import React, { ChangeEvent, useState } from 'react';
import { useModalsStore } from 'store/useModalsStore';
import { Button, Modal, TextArea } from 'ui-kit';
import './ModalKeyMessage.scss';

export const ModalKeyMessage = () => {
  const isShowModal = useModalsStore((state) => state.isKeyMessage);
  const changeShowModal = useModalsStore((state) => state.handleKeyMessage);
  const [comments, setComments] = useState('');

  const handleCreate = () => {
    if (comments.length) {
      setComments('');
      changeShowModal(false);
    }
  };

  return (
    <Modal
      className='ModalStyle'
      visibility={isShowModal}
      changeVisibility={changeShowModal}
    >
      <div className='ModalKeyMessage'>
        <h3 className='ModalKeyMessage__Header'>Опросник</h3>

        <div className='ModalKeyMessage__Form'>
          <TextArea
            className='CustomTextArea'
            value={comments}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setComments(e.currentTarget.value)
            }
            label='Комментарии'
            placeholder='Заполните поле'
          />
          <div className='ModalKeyMessage__ButtonGroup'>
            <Button
              className='ButtonCancel'
              onClick={() => changeShowModal(false)}
            >
              Отмена
            </Button>
            <Button className='ButtonCreate' onClick={handleCreate}>
              Создать опросник
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
