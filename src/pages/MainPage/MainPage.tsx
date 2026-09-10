import React, { FC } from 'react';

import Logo from 'assets/svg/logo/logo.svg';
import { AuthorizationForm } from 'components';
import { Image } from 'ui-kit';
import './MainPage.scss';

export const MainPage: FC = () => {
  return (
    <div className='MainPage'>
      <div className='header'>
        <div className='header__content'>
          <Image src={Logo} alt='Oragen' />
        </div>
      </div>
      <div className='main'>
        <div className='container'>
          <div className='main__content'>
            <h1 className='main__title'>
              Oragen — эффективный инструмент планирования коммуникаций
            </h1>
            <AuthorizationForm />
          </div>
        </div>
      </div>
      <div className='footer'>
        <div className='container'>
          <div className='footer__content'>
            <Image src={Logo} alt='Oragen' />
            <p className='copyright'>&copy; 2023 Oragen</p>
          </div>
        </div>
      </div>
    </div>
  );
};
