import React, { useState } from 'react';
import { Button, SearchForm } from 'ui-kit';
import { ROUTES } from 'enums';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';
import { useDebounceSelect } from 'hooks';
import './SearchForm.scss';

const SearchFormEmployees = () => {
  const setCurrentPage = useUserStore((state) => state.setCurrentPage);
  const setSearch = useUserStore((state) => state.setSearch);
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
    <div className='SearchForm'>
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
      <div className='ButtonWrapper'>
        <Button
          className='ButtonCreate'
          onClick={() => navigate(ROUTES.NEW_EMPLOYEE)}
        >
          Добавить сотрудника
        </Button>
      </div>
    </div>
  );
};

export default SearchFormEmployees;
