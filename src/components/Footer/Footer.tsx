import React from 'react';
import { useModalsStore } from 'store/useModalsStore';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { IconButtonAdd } from 'ui-kit/Button/IconButtonAdd/IconButtonAdd';
import { LanguageSelection } from './LanguageSelection';
import { FooterNav } from './FooterNav';
import './Footer.scss';

export const Footer = () => {
  const showModalMain = useModalsStore((state) => state.handleMainFooter);
  const login = useAuthStore((state) => state.token);

  return (
    <footer className='Footer'>
      <div className='Footer__container'>
        <div className='Footer__left-bloc'>
          <LanguageSelection />
          <FooterNav />
        </div>
        {login && (
          <div className='Footer__right-bloc'>
            <IconButtonAdd onClick={() => showModalMain(true)} />
          </div>
        )}
      </div>
      {/*<ModalMain />*/}
      {/*<ModalAddEvent />*/}
      {/*<ModalApplicationContact />*/}
      {/*<ModalApplicationOrganization />*/}
      {/*<ModalAddMessage />*/}
      {/*<ModalAddTask />*/}
      {/*<ModalAddVisit />*/}
      {/*<ModalAdminActivity />*/}
    </footer>
  );
};
