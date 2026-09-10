import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  memo,
} from 'react';

import classNames from 'classnames';

import { IconType } from '../Icon/IconType';

import { Icon } from 'ui-kit';
import './Button.scss';

export interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  typeIcon?: IconType;
  typeIconEnd?: IconType;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

const ButtonComponent: FC<IButtonProps> = (props) => {
  const {
    className,
    children,
    typeIcon,
    typeIconEnd,
    isDisabled = false,
    onClick,
    ...rest
  } = props;

  return (
    <button
      type='button'
      className={classNames('Button', className, {
        Button__disabled: isDisabled,
      })}
      disabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      {typeIcon && <Icon type={typeIcon} />}
      <span className={typeIcon ? 'Button-Text' : ''}>{children}</span>
      {typeIconEnd && <Icon type={typeIconEnd} />}
    </button>
  );
};

export const Button = memo(ButtonComponent);
