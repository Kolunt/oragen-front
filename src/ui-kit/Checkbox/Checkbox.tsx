import React, { FC, memo } from 'react';

import classNames from 'classnames';

import './Checkbox.scss';
import { Icon } from '../Icon/Icon';

interface ICheckboxProps {
  className?: string;
  label?: string;
  isChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxComponent: FC<ICheckboxProps> = (props) => {
  const { className, isChecked, label, onChange } = props;

  return (
    <label
      className={classNames('CheckBox', className, {
        CheckBox__active: isChecked,
      })}
    >
      <span className='CheckBox-Inner'>
        <Icon className='CheckBox-Icon' type='Checkbox' />
        <input
          checked={isChecked}
          name={label}
          type='checkbox'
          value={label}
          onChange={onChange}
        />
      </span>
      {label && <span className='CheckBox-Label'>{label}</span>}
    </label>
  );
};

export const Checkbox = memo(CheckboxComponent);
