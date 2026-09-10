import React, { useState } from 'react';
import { Button, InputForm } from 'ui-kit';
import { useOrganizationsStore } from 'store/useOrganizationsStore';
import { useModalsStore } from 'store/useModalsStore';
import { useDebounceSelect } from 'hooks';
import './SearchFormOrganizations.scss';

export const SearchFormOrganizations = () => {
  const showModal = useModalsStore((state) => state.handleOrganization);
  const setCurrentPage = useOrganizationsStore((state) => state.setCurrentPage);
  const setSearchAddress = useOrganizationsStore(
    (state) => state.setSearchAddress
  );
  const [inputAddress, setInputAddress] = useState<string>('');
  const setSearchName = useOrganizationsStore((state) => state.setSearchName);
  const [inputName, setInputName] = useState<string>('');

  const onChangeInputAddress = (value: string) => {
    setInputAddress(value);
    setCurrentPage(1);
  };

  const onChangeInputName = (value: string) => {
    setInputName(value);
    setCurrentPage(1);
  };

  const onResetParams = () => {
    setInputName('');
    setInputAddress('');
    setSearchAddress('');
    setSearchName('');
    setCurrentPage(1);
  };

  useDebounceSelect(inputAddress, setSearchAddress, true);
  useDebounceSelect(inputName, setSearchName, true);

  return (
    <div className='SearchFormOrganizations'>
      <div className='Form'>
        <InputForm
          className='mb-10'
          value={inputName}
          onChangeText={(value) => onChangeInputName(value)}
          label='Организация'
          placeholder='Организация'
        />
        <InputForm
          className='mb-10'
          value={inputAddress}
          onChangeText={(value) => onChangeInputAddress(value)}
          label='Адрес'
          placeholder='Адрес'
        />
        <Button className='ButtonReset' onClick={onResetParams}>
          Сброс параметров
        </Button>
      </div>
      <div className='ButtonWrapper'>
        <Button className='ButtonCreate' onClick={() => showModal(true)}>
          Добавить организацию
        </Button>
      </div>
    </div>
  );
};
