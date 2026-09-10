import React, { useState } from 'react';
import { Button, SearchForm } from 'ui-kit';
import { useModalsStore } from 'store/useModalsStore';
import './SearchFormApplications.scss';

interface ISearchFormApplications {}

export const SearchFormApplications = () => {
  const [search, setSearch] = useState<string>('');
  const showModal = useModalsStore((state) => state.handleApplication);

  return (
    <div className='SearchFormApplications'>
      <div className='Form'>
        <SearchForm value={search} onChangeText={setSearch} />
      </div>
      <div className='ButtonWrapper'>
        <Button
          className='ButtonCreate'
          typeIcon='ApplicationCheckSquare'
          onClick={() => showModal(true)}
        >
          Добавить заявку
        </Button>
      </div>
    </div>
  );
};
