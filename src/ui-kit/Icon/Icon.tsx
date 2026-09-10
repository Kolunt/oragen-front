import React, { DOMAttributes, FC, memo } from 'react';

import classNames from 'classnames';

import { IconType, iconTypes } from './IconType';
import './Icon.scss';

export type IconSizeType = 'small';

export interface IIconProps extends DOMAttributes<HTMLSpanElement> {
  className?: string;
  size?: IconSizeType;
  type: IconType;
  onClick?: () => void | Promise<void>;
}

const getIcon = (type: IconType) => iconTypes.get(type);

const IconComponent: FC<IIconProps> = (props) => {
  const { className, size, type, onClick, ...rest } = props;

  return (
    <span
      className={classNames('Icon', className, `Icon-IconSize__${size}`)}
      onClick={onClick}
      {...rest}
    >
      {getIcon(type)}
    </span>
  );
};

export const Icon = memo(IconComponent);
