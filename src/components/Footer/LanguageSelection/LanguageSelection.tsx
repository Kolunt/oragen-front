import React from 'react';
import FlagImg from 'assets/img/flag.png';
import { Image } from 'ui-kit';
import './LanguageSelection.scss';

export const LanguageSelection = () => {
  return (
    <div className='LanguageSelection'>
      <div className='LanguageSelection__wrapper'>
        <Image src={FlagImg} alt='Flag' />
      </div>
      <div>Русский</div>
    </div>
  );
};
