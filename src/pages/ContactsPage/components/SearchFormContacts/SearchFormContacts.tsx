import React, { useState } from 'react';
import { Button, Icon, InputForm, ISelectOption, SelectForm } from 'ui-kit';
import { useContactsStore } from 'store/useContactsStore';
import { useDebounceSelect, useSelectOptions } from 'hooks';
import { useModalsStore } from 'store/useModalsStore';
import { useSearchFormContactsStore } from 'pages';
import './SearchFormContacts.scss';

export const SearchFormContacts = () => {
  const filtration = useContactsStore((state) => state.filtration);
  const setFiltration = useContactsStore((state) => state.setFiltration);
  const setCurrentPage = useContactsStore((state) => state.setCurrentPage);
  const changeShowModal = useModalsStore((state) => state.handleContact);
  const drugs = useSearchFormContactsStore((state) => state.drugs);
  const getDrugs = useSearchFormContactsStore((state) => state.getDrugs);
  const [inputDrug, setInputDrug] = useState<string>('');
  const [drugSelect, setDrugSelect] = useState<ISelectOption>(
    {} as ISelectOption
  );
  const specialties = useSearchFormContactsStore((state) => state.specialties);
  const getSpecialties = useSearchFormContactsStore(
    (state) => state.getSpecialties
  );
  const [inputSpecialties, setInputSpecialties] = useState<string>('');
  const [specialtySelect, setSpecialtySelect] = useState<ISelectOption>(
    {} as ISelectOption
  );
  const setSearchAddress = useContactsStore((state) => state.setSearchAddress);
  const [inputAddress, setInputAddress] = useState<string>('');
  const setSearchName = useContactsStore((state) => state.setSearchName);
  const [inputName, setInputName] = useState<string>('');

  const onChangeDrugSelect = (drug: ISelectOption) => {
    setFiltration({
      ...filtration,
      drugId: drug ? +drug.value : undefined,
    });
    setDrugSelect(drug);
    setCurrentPage(1);
  };

  const onChangeSpecialty = (specialty: ISelectOption) => {
    setFiltration({
      ...filtration,
      where: { ...filtration.where, position: specialty?.label },
    });
    setSpecialtySelect(specialty);
    setCurrentPage(1);
  };

  const onChangeInputAddress = (value: string) => {
    setInputAddress(value);
    setCurrentPage(1);
  };

  const onChangeInputName = (value: string) => {
    setInputName(value);
    setCurrentPage(1);
  };

  const onResetParams = () => {
    setInputSpecialties('');
    setInputDrug('');
    setDrugSelect({} as ISelectOption);
    setSpecialtySelect({} as ISelectOption);
    setInputName('');
    setInputAddress('');
    setSearchAddress('');
    setSearchName('');
    setFiltration({ drugId: undefined, where: {} });
    setCurrentPage(1);
  };

  useDebounceSelect(inputDrug, getDrugs);
  useDebounceSelect(inputSpecialties, getSpecialties);
  useDebounceSelect(inputAddress, setSearchAddress, true);
  useDebounceSelect(inputName, setSearchName, true);

  const positions = useSelectOptions(specialties, 'id', 'name');
  const drugsList = useSelectOptions(drugs, 'id', 'name');

  return (
    <div className='SearchFormContacts'>
      <div className='Form'>
        <InputForm
          className='CustomInput'
          value={inputName}
          onChangeText={(value) => onChangeInputName(value)}
          label='ФИО'
          placeholder='ФИО'
        />
        <InputForm
          className='CustomInput'
          value={inputAddress}
          onChangeText={(value) => onChangeInputAddress(value)}
          label='Адрес'
          placeholder='Адрес'
        />
        <SelectForm
          сlearable={true}
          className='mb-10'
          iconType='search'
          inputValue={inputSpecialties}
          onInputChange={setInputSpecialties}
          value={specialtySelect}
          onChange={(e) => onChangeSpecialty(e as ISelectOption)}
          options={positions}
          label='Специальность'
          isOptionDisabled={!inputSpecialties.length}
        />
        <SelectForm
          сlearable={true}
          iconType='search'
          inputValue={inputDrug}
          onInputChange={setInputDrug}
          value={drugSelect}
          onChange={(e) => onChangeDrugSelect(e as ISelectOption)}
          options={drugsList}
          label='Препарат'
          placeholder='Препарат'
          isOptionDisabled={!inputDrug.length}
        />
        <Button className='btn reset' onClick={onResetParams}>
          Сброс параметров
        </Button>
        <div className='IconResetWrapper' onClick={onResetParams}>
          <Icon type={'Reset'} />
        </div>
      </div>
      <div className='flex justify-center'>
        <Button
          className='w-full mr-20 ml-20'
          onClick={() => changeShowModal(true)}
        >
          Добавить контакт
        </Button>
      </div>
    </div>
  );
};
