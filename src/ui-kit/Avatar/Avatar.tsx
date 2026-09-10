import React, { FC } from 'react';

import classNames from 'classnames';
import './Avatar.scss';

export interface IAvatarProps {
  className?: string;
  image?: string;
}

export const Avatar: FC<IAvatarProps> = (props) => {
  const { className, image } = props;

  return (
    <div className={classNames('Avatar', className)}>
      <img src={image} alt='Avatar' />
    </div>
  );
};
