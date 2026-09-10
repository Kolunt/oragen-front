import React from 'react';
import { Button, Modal } from 'ui-kit';
import { useModalsStore } from 'store/useModalsStore';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'enums';
import './ModalTaskSelection.scss';

export const ModalTaskSelection = () => {
  const isShowModal = useModalsStore((state) => state.isTaskSelection);
  const changeShowModal = useModalsStore((state) => state.handleTaskSelection);
  const navigate = useNavigate();

  const goNewTasksPage = () => {
    changeShowModal(false);
    navigate(ROUTES.NEW_TASK);
  };

  const goNewProjectPage = () => {
    changeShowModal(false);
    navigate(ROUTES.NEW_PROJECT);
  };

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalTaskSelection'>
        <Button className='CustomButton' onClick={goNewProjectPage}>
          Проект
        </Button>
        <Button className='CustomButton' onClick={goNewTasksPage}>
          Задача
        </Button>
      </div>
    </Modal>
  );
};
