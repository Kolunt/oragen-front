import React, { useEffect, useState } from 'react';
import AvatarImg from 'assets/svg/contacts/ContactsPerson.svg';
import LogoImg from 'assets/svg/logo/logo.svg';
import { useModalsStore } from 'store/useModalsStore';
import { Avatar, Icon, Image } from 'ui-kit';
import { ResponsiveMenu } from '../ResponsiveMenu/ResponsiveMenu';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { RoleTypes, ROUTES } from 'enums';
import { IconButtonAdd } from 'ui-kit/Button/IconButtonAdd/IconButtonAdd';
import './Heading.scss';
import {
  ModalAddContact,
  ModalAddEvent,
  ModalAddMessage,
  ModalAddOrganization,
  ModalAddTask,
  ModalAddVisit,
  ModalAdminActivity,
  ModalMain,
  ModalVisitMain,
} from 'components/Modals';
import { ModalErrorWidthScreen } from 'components/Modals/ModalErrorWidthScreen/ModalErrorWidthScreen';
import { useOutsideClick, useResize } from 'hooks';
import { ModalAddVisitPharmacy } from 'components/Modals/ModalAddVisitPharmacy/ModalAddVisitPharmacy';
import { ModalAddVisitRemote } from 'components/Modals/ModalAddVisitRemote/ModalAddVisitRemote';
import { useUserStore } from 'store/useUserStore';
import { ModalChooseFile } from 'components/Modals/ModalChooseFile/ModalChooseFile';

export const Heading = () => {
  const showModal = useModalsStore((state) => state.handleMainFooter);
  const logOut = useAuthStore((state) => state.logOut);
  const login = useAuthStore((state) => state.token);
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  const [isShowResponsiveMenu, setIsShowResponsiveMenu] = useState(false);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const handleErrorWidthScreen = useModalsStore(
    (state) => state.handleErrorWidthScreen
  );
  const navigate = useNavigate();

  const { isScreenSm } = useResize();

  useEffect(() => {
    if (!isScreenSm) {
      handleErrorWidthScreen(true);
    }
    if (isScreenSm) {
      handleErrorWidthScreen(false);
    }
  }, [isScreenSm]);

  const ref = useOutsideClick(() => {
    setIsShowDropdown((prev) => !prev);
  });

  const handleClick = () => {
    setIsShowResponsiveMenu((prev) => !prev);
  };

  const handleDropdownList = () => {
    setIsShowDropdown((prev) => !prev);
  };

  const onClickLogOut = () => {
    logOut();
    navigate(ROUTES.MAIN);
  };

  return (
    <header className='Header'>
      <div className='Header__Container'>
        <div className='Header__Logo' onClick={() => navigate(ROUTES.HOME)}>
          <Image src={LogoImg} alt='Oragen' />
        </div>
        {login && (
          <div className='Header__Block'>
            <div className='Header__Inner'>
              {/*<SearchHeader className='Search' />*/}
              {/*<Image src={BellImg} />*/}
              <div className='color-secondary-l2 text-right'>
                <div>{me.first_name}</div>
                <div>{me.name}</div>
              </div>
              <div className='AvatarWrapper' onClick={handleDropdownList}>
                <Avatar className='CustomAvatar' image={AvatarImg} />
                {isShowDropdown && (
                  <div className='DropdownList' ref={ref}>
                    <div className='List'>
                      <div className='List__Title'>
                        <span>{me.name}</span>
                        <Icon className='pointer' type={'Close'} />
                      </div>
                      <div className='separator' />
                      <div className='List__Item'>
                        <Icon type='Profile' />
                        <span>Профиль</span>
                      </div>
                      <div className='List__Item' onClick={onClickLogOut}>
                        <Icon type='Exit' />
                        <span>Выйти</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {myRole !== RoleTypes.CALL_CENTER && (
                <IconButtonAdd
                  className='CustomButtonAdd'
                  onClick={() => showModal(true)}
                />
              )}
            </div>
            <div className='Header__ButtonActions'>
              <Icon className='ButtonNav' type={'Nav'} onClick={handleClick} />
            </div>
          </div>
        )}
        <ResponsiveMenu
          visibility={isShowResponsiveMenu}
          changeVisibility={setIsShowResponsiveMenu}
        />
      </div>
      <ModalMain />
      <ModalAddEvent />
      <ModalAddContact />
      <ModalAddOrganization />
      <ModalAddMessage />
      <ModalAddTask />
      <ModalAddVisit />
      <ModalAddVisitPharmacy />
      <ModalAddVisitRemote />
      <ModalAdminActivity />
      <ModalErrorWidthScreen />
      <ModalVisitMain />
      <ModalChooseFile />
    </header>
  );
};
