import React, { useEffect, useState } from 'react';
import { Button, SearchForm } from 'ui-kit';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'enums';
import { useBrickStore } from 'store/useBrickStore';
import './SearchFormBricks.scss';
import { useDebounceSelect } from 'hooks';

export const SearchFormBricks = () => {
  const setSearch = useBrickStore((state) => state.setSearch);
  const setCurrentPage = useBrickStore((state) => state.setCurrentPage);
  const [inputSearch, setInputSearch] = useState<string>('');
  const navigate = useNavigate();

  const onChangeSearch = (value: string) => {
    setInputSearch(value);
    setCurrentPage(1);
  };

  const onResetParams = () => {
    setSearch('');
    setInputSearch('');
    setCurrentPage(1);
  };

  useDebounceSelect(inputSearch, setSearch, true);

  return (
    <div className='SearchFormBricks'>
      <div className='Form'>
        <SearchForm
          className='SearchStyle'
          value={inputSearch}
          onChangeText={(value) => onChangeSearch(value)}
        />
        <Button className='ButtonReset' onClick={onResetParams}>
          Сброс параметров
        </Button>
      </div>
      <div className='w-full flex justify-center'>
        <Button
          className='w-full ml-20 mr-20'
          onClick={() => navigate(ROUTES.NEW_BRICKS)}
        >
          Добавить брик
        </Button>
      </div>
    </div>
  );
};
