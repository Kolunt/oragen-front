import React, { FC, memo } from 'react';

import classNames from 'classnames';
import './CheckboxCustom.scss';

interface ICheckboxSquareProps {
  className?: string;
  label?: string;
  isChecked?: boolean;
  onChange?: () => void;
}

export const CheckboxComponent: FC<ICheckboxSquareProps> = (props) => {
  const { className, label, isChecked, onChange } = props;

  return (
    <label className={classNames('CheckboxCustom', className)}>
      <input
        type='checkbox'
        className='real-checkbox'
        checked={isChecked}
        name={label}
        value={label}
        onChange={onChange}
      />
      <span className='custom-checkbox' />
      {label && <span className='Label'>{label}</span>}
    </label>
  );
};

export const CheckboxCustom = memo(CheckboxComponent);
