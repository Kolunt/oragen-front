import React, { memo } from 'react';

import classNames from 'classnames';

import './IconButton.scss';
import { Icon } from '../../Icon/Icon';
import { IconType } from '../../Icon/IconType';
import { Button, IButtonProps } from '../Button';

export interface IIconButtonProps extends IButtonProps {
  className?: string;
  typeIcon: IconType;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

const IconButtonComponent: React.FC<IIconButtonProps> = ({
  className,
  typeIcon,
  isDisabled = false,
  onClick,
  ...rest
}) => {
  return (
    <Button
      className={classNames('IconButton', className)}
      data-testid='test-icon-button'
      isDisabled={isDisabled}
      onClick={onClick}
      {...rest}
    >
      <Icon type={typeIcon} />
    </Button>
  );
};

export const IconButton = memo(IconButtonComponent);
