import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useState,
} from 'react';

import classNames from 'classnames';

import { Icon } from '../Icon/Icon';
import './SearchForm.scss';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type ISearchProps = DefaultInputPropsType & {
  className?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
};

export const SearchForm: FC<ISearchProps> = (props) => {
  const { className, onChangeText, onChange, value, placeholder } = props;
  const [isActive, setIsActive] = useState(false);

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (onChangeText) onChangeText(e.currentTarget.value);
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  return (
    <div
      className={classNames('SearchForm', className, {
        Search__active: isActive,
      })}
    >
      <div className='SearchForm-Form'>
        <div className='SearchForm-InputWrapper'>
          <input
            value={value}
            className='SearchForm-Input'
            placeholder={placeholder ?? 'Поиск'}
            type='text'
            onChange={onChangeCallback}
            onFocus={handleFocus}
          />
          <Icon className='SearchForm-Icon' type='Search' />
        </div>
      </div>
    </div>
  );
};
