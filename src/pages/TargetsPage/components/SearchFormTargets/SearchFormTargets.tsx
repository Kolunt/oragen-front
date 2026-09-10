import React from 'react';
import { Button, SearchForm, SelectForm } from 'ui-kit';
import { ROUTES } from 'enums';
import { useNavigate } from 'react-router-dom';
import './SearchFormTargets.scss';

export const SearchFormTargets = () => {
  const navigate = useNavigate();

  const handleResetParams = () => {};

  return (
    <div className='SearchFormTargets'>
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
        <SelectForm
          className='SelectStyle'
          // value={selectedJob}
          // onChange={setSelectedJob}
          options={[]}
          label='Место работы'
        />
        <Button className='ButtonReset' onClick={handleResetParams}>
          Сброс параметров
        </Button>
      </div>
      <div className='ButtonWrapper'>
        <Button
          className='ButtonCreate'
          onClick={() => navigate(ROUTES.NEW_TARGET)}
        >
          Добавить таргет
        </Button>
      </div>
    </div>
  );
};
