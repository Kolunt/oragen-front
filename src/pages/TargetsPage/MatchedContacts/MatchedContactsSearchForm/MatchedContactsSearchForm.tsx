import React from 'react';
import { Button, SearchForm, SelectForm } from 'ui-kit';
import { useNavigate } from 'react-router-dom';
import './MatchedContactsSearchForm.scss';

export const MatchedContactsSearchForm = () => {
  const navigate = useNavigate();

  const handleResetParams = () => {};

  return (
    <div className='MatchedContactsSearchForm'>
      <div className='Form'>
        <SearchForm
          className='SearchStyle'
          // value={search}
          // onChangeText={setSearch}
        />
        <SelectForm
          className='SelectStyle'
          // value={selectedSpecialty}
          // onChange={setSelectedSpecialty}
          options={[]}
          label='Специальность'
        />
        <Button className='ButtonReset' onClick={handleResetParams}>
          Сброс параметров
        </Button>
      </div>
      <div className='ButtonWrapper'>
        {/*  <Button
          className='ButtonCreate'
          onClick={() => navigate(ROUTES.NEW_TARGET)}
        >
          Добавить контакт
        </Button>*/}
      </div>
    </div>
  );
};
