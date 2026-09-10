import React from 'react';
import { Button, Modal } from 'ui-kit';
import { useModalsStore } from 'store/useModalsStore';
import {
  NewTargetCustomFieldType,
  useNewTargetReportStore,
} from 'store/useNewTargetReportStore';
import { v1 } from 'uuid';
import './ModalAddCustomField.scss';

export const ModalAddCustomField = () => {
  const isShowModal = useModalsStore((state) => state.isAddCustomField);
  const changeShowModal = useModalsStore((state) => state.handleAddCustomField);
  // const addSection = useNewTargetReportStore((state) => state.addSection);
  // const setModeAddSection = useNewTargetReportStore(
  //   (state) => state.setModeAddSection
  // );

  const handleAddCustomField = (type: NewTargetCustomFieldType) => {
    const newSection = {
      id: v1(),
      question: '',
      type,
      variants: [],
      advice: '',
      answer: [],
      fields: [],
    };
    // addSection(newSection);
    changeShowModal(false);
    // setModeAddSection(false);
  };

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddCustomField'>
        <Button
          className='CustomButton'
          onClick={() => handleAddCustomField('checkbox')}
        >
          Несколько вариантов
        </Button>
        <Button
          className='CustomButton'
          onClick={() => handleAddCustomField('radio')}
        >
          Один вариант
        </Button>
        <Button
          className='CustomButton'
          onClick={() => handleAddCustomField('field')}
        >
          Развернутый ответ
        </Button>
        {/*        <Button
          className='CustomButton'
          onClick={() => handleAddCustomField('file')}
        >
          Фото
        </Button>*/}
      </div>
    </Modal>
  );
};
