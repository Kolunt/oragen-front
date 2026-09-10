import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { Icon } from '../../Icon/Icon';
import classNames from 'classnames';
import './IconButtonAdd.scss';

interface IIconButtonAdd
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

export const IconButtonAdd: FC<IIconButtonAdd> = (props) => {
  const { className, isDisabled = false, onClick, ...rest } = props;
  return (
    <button
      type='button'
      className={classNames('IconButtonAdd', className, {
        'Button--disabled': isDisabled,
      })}
      onClick={onClick}
      disabled={isDisabled}
      {...rest}
    >
      <Icon type='AddSquare' />
    </button>
  );
};
