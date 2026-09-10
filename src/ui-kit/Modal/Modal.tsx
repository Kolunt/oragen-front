import React, { FC, useEffect, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { Icon } from 'ui-kit/Icon/Icon';
import './Modal.scss';

interface IModalProps {
  className?: string;
  classNameContent?: string;
  children?: React.ReactNode;
  visibility: boolean;
  changeVisibility: (value: boolean) => void;
  isIcon?: boolean;
  minPriority?: boolean;
}

export const Modal: FC<IModalProps> = (props) => {
  const {
    className,
    classNameContent,
    children,
    visibility,
    changeVisibility,
    isIcon = false,
    minPriority = false,
  } = props;

  useEffect(() => {
    const close: any = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        changeVisibility(false);
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  if (!visibility) {
    return null;
  }

  return (
    <div
      className={classNames('Modal', className, {
        Modal__MinPriority: minPriority,
      })}
      onClick={() => changeVisibility(false)}
    >
      <div
        className={classNames('ModalContent ZoomIn', classNameContent)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        {isIcon && (
          <div className='ModalIcon' onClick={() => changeVisibility(false)}>
            <Icon type={'Close'} />
          </div>
        )}
      </div>
    </div>
  );
};
