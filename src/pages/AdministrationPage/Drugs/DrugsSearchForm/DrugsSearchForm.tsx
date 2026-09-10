import React, { useState } from 'react';
import { Button, SearchForm } from 'ui-kit';
import { useModalsStore } from 'store/useModalsStore';
import { useDrugsStore } from 'store/useDrugsStore';
import { useDebounceSelect } from 'hooks';
import './DrugsSearchForm.scss';

export const DrugsSearchForm = () => {
  const showModal = useModalsStore((state) => state.handleAddDrug);
  const setSearch = useDrugsStore((state) => state.setSearch);
  const setCurrentPage = useDrugsStore((state) => state.setCurrentPage);
  const [inputSearch, setInputSearch] = useState<string>('');

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
    <div className='DrugsSearchForm'>
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
        <Button className='ButtonCreate' onClick={() => showModal(true)}>
          Добавить препарат
        </Button>
      </div>
    </div>
  );
};
