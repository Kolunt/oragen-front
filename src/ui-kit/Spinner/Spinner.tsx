import React from 'react';
import { Icon } from '../Icon/Icon';
import './Spinner.scss';

export const Spinner: React.FC = () => {
  return (
    <div className='Spinner'>
      <Icon type='Spinner' />
    </div>
  );
};
