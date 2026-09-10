import React, { useEffect, useState } from 'react';
import { useVisitsGroupPharmacyStore } from 'pages/PharmacyVisitsPage/useVisitsGroupPharmacy';
import { Button, InputForm, ISelectOption, SelectForm } from 'ui-kit';
import { useDebounceSelect, useSelectOptions } from 'hooks';
import { useModalsStore } from 'store/useModalsStore';
import { useUserStore } from 'store/useUserStore';
import { RoleTypes } from 'enums';
import { useSearchListPharmacyStore } from 'pages';
import './SearchListPharmacy.scss';

export const SearchListPharmacy = () => {
  const myRole = useUserStore((state) => state.me.roles[0].name);
  const showModalAddVisit = useModalsStore(
    (state) => state.handleVisitPharmacy
  );
  const [inputAddress, setInputAddress] = useState<string>('');
  const setAddress = useVisitsGroupPharmacyStore((state) => state.setAddress);
  const setCurrentPage = useVisitsGroupPharmacyStore(
    (state) => state.setCurrentPage
  );
  const setDrugId = useVisitsGroupPharmacyStore((state) => state.setDrugId);
  const setOrganizationId = useVisitsGroupPharmacyStore(
    (state) => state.setOrganizationId
  );
  const drugs = useSearchListPharmacyStore((state) => state.drugs);
  const getDrugs = useSearchListPharmacyStore((state) => state.getDrugs);
  const [inputDrug, setInputDrug] = useState<string>('');
  const [drugSelect, setDrugSelect] = useState<ISelectOption>(
    {} as ISelectOption
  );
  const pharmacies = useSearchListPharmacyStore((state) => state.pharmacies);
  const getPharmacies = useSearchListPharmacyStore(
    (state) => state.getPharmacies
  );
  const [inputPharmacy, setInputPharmacy] = useState<string>('');
  const [pharmacySelect, setPharmacySelect] = useState<ISelectOption>(
    {} as ISelectOption
  );

  useEffect(() => {
    if (drugSelect && drugSelect.value) {
      setDrugId(+drugSelect.value);
    } else {
      setDrugId(undefined);
    }
    if (pharmacySelect && pharmacySelect.value) {
      setOrganizationId(+pharmacySelect.value);
    } else {
      setOrganizationId(undefined);
    }
  }, [drugSelect, pharmacySelect]);

  useDebounceSelect(inputDrug, getDrugs);
  useDebounceSelect(inputPharmacy, getPharmacies);
  useDebounceSelect(inputAddress, setAddress, true);

  const drugsList = useSelectOptions(drugs, 'id', 'name');
  const pharmaciesList = useSelectOptions(pharmacies, 'id', 'name');

  const onResetParams = () => {
    setAddress('');
    setInputAddress('');
    setDrugSelect({} as ISelectOption);
    setPharmacySelect({} as ISelectOption);
  };

  const onChangeDrugSelect = (e: ISelectOption) => {
    setCurrentPage(1);
    setDrugSelect(e);
  };

  const onChangePharmacySelect = (e: ISelectOption) => {
    setCurrentPage(1);
    setPharmacySelect(e);
  };

  const onChangeInputAddress = (value: string) => {
    setCurrentPage(1);
    setInputAddress(value);
  };

  return (
    <div className='SearchListPharmacy'>
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
          inputValue={inputPharmacy}
          onInputChange={setInputPharmacy}
          value={pharmacySelect}
          onChange={(e) => onChangePharmacySelect(e as ISelectOption)}
          options={pharmaciesList}
          label='Организация'
          isOptionDisabled={!inputPharmacy.length}
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
        <div className='flex justify-center'>
          <Button
            className='w-full mr-20 ml-20'
            onClick={() => showModalAddVisit(true)}
          >
            Добавить визит
          </Button>
        </div>
      )}
    </div>
  );
};
