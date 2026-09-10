import React, { FC, useRef, useState } from 'react';

import classNames from 'classnames';

import { Icon } from '../Icon/Icon';
import './SearchHeader.scss';

export interface ISearchProps {
  className?: string;
  searchedKeyword?: string;
  onSearchChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchHeader: FC<ISearchProps> = (props) => {
  const { className, searchedKeyword, onSearchChange } = props;
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) onSearchChange(event);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  return (
    <div
      className={classNames('Search', className, {
        Search__active: isActive,
      })}
    >
      <form className='Search-Form'>
        <div className='Search-InputWrapper'>
          <input
            className='Search-Input'
            autoComplete='off'
            name='search'
            placeholder='Поиск'
            ref={inputRef}
            type='text'
            value={searchedKeyword}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <Icon className='Search-Icon' type='Search' />
        </div>
      </form>
    </div>
  );
};
