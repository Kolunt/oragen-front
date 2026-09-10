import React, { useEffect, useState } from 'react';
import { Button, InputForm, ISelectOption, SelectForm } from 'ui-kit';
import { useDebounceSelect, useSelectOptions } from 'hooks';
import { useVisitsGroupStore } from 'pages/VisitsPage/useVisitsGroupStore';
import { useModalsStore } from 'store/useModalsStore';
import { useUserStore } from 'store/useUserStore';
import { RoleTypes } from 'enums';
import { useSearchFormVisitsStore } from 'pages';
import './SearchFormVisits.scss';

export const SearchFormVisits = () => {
  const showModalAddVisit = useModalsStore((state) => state.handleVisit);
  const showModalAddVisitRemote = useModalsStore(
    (state) => state.handleVisitRemote
  );
  const myRole = useUserStore((state) => state.me.roles[0].name);
  const setAddress = useVisitsGroupStore((state) => state.setAddress);
  const setCurrentPage = useVisitsGroupStore((state) => state.setCurrentPage);
  const [inputAddress, setInputAddress] = useState<string>('');
  const contacts = useSearchFormVisitsStore((state) => state.contacts);
  const getContacts = useSearchFormVisitsStore((state) => state.getContacts);
  const [inputContact, setInputContact] = useState<string>('');
  const [contactSelect, setContactSelect] = useState<ISelectOption>(
    {} as ISelectOption
  );
  const drugs = useSearchFormVisitsStore((state) => state.drugs);
  const getDrugs = useSearchFormVisitsStore((state) => state.getDrugs);
  const [inputDrug, setInputDrug] = useState<string>('');
  const [drugSelect, setDrugSelect] = useState<ISelectOption>(
    {} as ISelectOption
  );
  const setDrugId = useVisitsGroupStore((state) => state.setDrugId);
  const setContactId = useVisitsGroupStore((state) => state.setContactId);

  useEffect(() => {
    if (drugSelect && drugSelect.value) {
      setDrugId(+drugSelect.value);
    } else {
      setDrugId(undefined);
    }
    if (contactSelect && contactSelect.value) {
      setContactId(+contactSelect.value);
    } else {
      setContactId(undefined);
    }
  }, [drugSelect, contactSelect]);

  useDebounceSelect(inputContact, getContacts);
  useDebounceSelect(inputDrug, getDrugs);
  useDebounceSelect(inputAddress, setAddress, true);

  const drugsList = useSelectOptions(drugs, 'id', 'name');
  const contactsList = useSelectOptions(contacts, 'id', 'full_name');

  const onResetParams = () => {
    setAddress('');
    setInputAddress('');
    setDrugSelect({} as ISelectOption);
    setContactSelect({} as ISelectOption);
  };

  const onChangeDrugSelect = (e: ISelectOption) => {
    setCurrentPage(1);
    setDrugSelect(e);
  };

  const onChangeContactSelect = (e: ISelectOption) => {
    setCurrentPage(1);
    setContactSelect(e);
  };

  const onChangeInputAddress = (value: string) => {
    setInputAddress(value);
    setCurrentPage(1);
  };

  return (
    <div className='SearchFormVisits'>
      <div className='Form'>
        <SelectForm
          сlearable={true}
          className='mb-10'
          iconType={'search'}
          inputValue={inputDrug}
          onInputChange={setInputDrug}
          value={drugSelect}
          onChange={(e) => onChangeDrugSelect(e as ISelectOption)}
          options={drugsList}
          label='Цикл'
          isOptionDisabled={!inputDrug.length}
        />
        <SelectForm
          сlearable={true}
          className='mb-10'
          iconType={'search'}
          inputValue={inputContact}
          onInputChange={setInputContact}
          value={contactSelect}
          onChange={(e) => onChangeContactSelect(e as ISelectOption)}
          options={contactsList}
          label='Контакт'
          isOptionDisabled={!inputContact.length}
        />
        <InputForm
          value={inputAddress}
          onChangeText={(value) => onChangeInputAddress(value)}
          label='Адрес'
          placeholder='Адрес'
        />
        <Button className='btn reset' onClick={onResetParams}>
          Сброс параметров
        </Button>
      </div>
      {myRole === RoleTypes.MED_REP && (
        <div className='flex flex-column items-center pr-20 pl-20'>
          <Button
            className='w-full mb-10 pr-20 pl-20'
            onClick={() => showModalAddVisit(true)}
          >
            Добавить визит к врачу
          </Button>
          <Button
            className='w-full pr-20 pl-20'
            onClick={() => showModalAddVisitRemote(true)}
          >
            Добавить дистанционный визит
          </Button>
        </div>
      )}
    </div>
  );
};
