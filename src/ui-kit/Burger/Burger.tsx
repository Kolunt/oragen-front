import React, { FC } from 'react';

import classNames from 'classnames';
import './Burger.scss';

interface IBurgerProps {
  className?: string;
}

export const Burger: FC<IBurgerProps> = (props) => {
  const { className } = props;

  return (
    <div className={classNames('Burger', className)} data-auto='burger'>
      <div />
      <div />
      <div />
    </div>
  );
};
