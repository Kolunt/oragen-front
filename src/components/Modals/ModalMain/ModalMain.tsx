import React from 'react';
import { useModalsStore } from 'store/useModalsStore';
import { Icon, Modal } from 'ui-kit';
import { useNavigate } from 'react-router-dom';
import { RoleTypes, ROUTES } from 'enums';
import { useUserStore } from 'store/useUserStore';
import './ModalMain.scss';

export const ModalMain = () => {
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  const isShowModal = useModalsStore((state) => state.isMainFooter);
  const changeShowModal = useModalsStore((state) => state.handleMainFooter);
  const changeShowModalEvent = useModalsStore((state) => state.handleEvent);
  const changeShowModalContact = useModalsStore((state) => state.handleContact);
  const changeShowModalVisit = useModalsStore((state) => state.handleMainVisit);
  const changeShowModalOrganization = useModalsStore(
    (state) => state.handleOrganization
  );
  const changeShowModalMessage = useModalsStore((state) => state.handleMessage);
  const showAdmin = useModalsStore((state) => state.handleAdminActivity);
  const navigate = useNavigate();

  const goToNewTaskPage = () => {
    navigate(ROUTES.NEW_TASK);
    changeShowModal(false);
  };

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalMain'>
        {myRole === RoleTypes.MED_REP && (
          <div
            className='ModalMain__Item'
            onClick={() => changeShowModalVisit(true)}
          >
            <div className='ModalMain__Icon'>
              <Icon type='VisitsTv' />
            </div>
            <p>Добавить визит</p>
          </div>
        )}
        <div
          className='ModalMain__Item'
          onClick={() => changeShowModalEvent(true)}
        >
          <div className='ModalMain__Icon'>
            <Icon type='FooterCalendar' />
          </div>
          <p>Добавить мероприятие</p>
        </div>

        <div
          className='ModalMain__Item'
          onClick={() => changeShowModalContact(true)}
        >
          <div className='ModalMain__Icon'>
            <Icon type='FooterPerson' />
          </div>
          <p>Создать контакт</p>
        </div>

        <div
          className='ModalMain__Item'
          onClick={() => changeShowModalOrganization(true)}
        >
          <div className='ModalMain__Icon'>
            <Icon type='FooterBag' />
          </div>
          <p>Добавить организацию</p>
        </div>

        <div className='ModalMain__Item' onClick={() => showAdmin(true)}>
          <div className='ModalMain__Icon'>
            <Icon type='VisitsUnion' />
          </div>
          <p>Административная активность</p>
        </div>

        <div className='ModalMain__Item' onClick={goToNewTaskPage}>
          <div className='ModalMain__Icon'>
            <Icon type='VisitsUnion' />
          </div>
          <p>Создать задачу</p>
        </div>

        {/*<div className='wrapper'>
          <div
            className='ModalMain__Big-Item'
            onClick={() => changeShowModalMessage(true)}
          >
            <div className='ModalMain__Big-Icon'>
              <Icon type='FooterMessagePlusAccent' />
            </div>
            <p>Написать сообщение</p>
          </div>

          <div className='ModalMain__Big-Item' onClick={goToNewTaskPage}>
            <div className='ModalMain__Big-Icon'>
              <Icon type='FooterFlashAccent' />
            </div>
            <p>Создать задачу</p>
          </div>
        </div>*/}
      </div>
    </Modal>
  );
};
