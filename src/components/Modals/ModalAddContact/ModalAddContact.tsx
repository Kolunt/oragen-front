import React, { FC, useEffect, useState } from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  companyValidation,
  emailValidation,
  fullNameValidation,
} from 'validation/validation';
import { useModalsStore } from 'store/useModalsStore';
import {
  Button,
  InputForm,
  ISelectOption,
  Modal,
  PhoneInput,
  SelectForm,
} from 'ui-kit';
import { OrganizationTypes } from 'enums';
import {
  CreateContactApplicationType,
  useApplicationsStore,
} from 'store/useApplicationsStore';
import { useCommonStore } from 'store/useCommonStore';
import { useSelectOptions } from 'hooks';
import { AddressInputControl } from 'ui-kit/InputForm/AddressInputControl/AddressInputControl';
import './ModalAddContact.scss';
import { useDebounceSelect } from 'hooks/useDebounceSelect';

interface IContactForm {
  fullName: string;
  phone: string;
  position: ISelectOption;
  type: ISelectOption;
  company: string;
  email: string;
  address: any;
}

const options: ISelectOption[] = [
  { value: OrganizationTypes.MPI, label: 'ЛПУ' },
  { value: OrganizationTypes.PHARMACY, label: 'Аптека' },
];

export const ModalAddContact: FC = () => {
  const isShowModal = useModalsStore((state) => state.isContact);
  const changeShowModal = useModalsStore((state) => state.handleContact);
  const specialties = useCommonStore((state) => state.specialties);
  const getSpecialties = useCommonStore((state) => state.getSpecialties);
  const [inputSpecialties, setInputSpecialties] = useState<string>('');
  const addContactApplication = useApplicationsStore(
    (state) => state.addContactApplication
  );
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IContactForm>({
    defaultValues: {
      fullName: '',
      phone: '+7',
      email: '',
      position: undefined,
      company: '',
      type: undefined,
      address: undefined,
    },
  });

  const onSubmit: SubmitHandler<IContactForm> = (data) => {
    const newContact: CreateContactApplicationType = {
      full_name: data.fullName,
      company: data.company,
      phone: data.phone,
      position: data.position.label,
      organization_type: data.type.value,
      address: data.address.value,
      email: data.email,
    };
    addContactApplication(newContact);
    onCancel();
  };

  const onCancel = () => {
    reset();
    changeShowModal(false);
  };

  useDebounceSelect(inputSpecialties, getSpecialties);

  const specialtiesList = useSelectOptions(specialties, 'id', 'name');

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddContact'>
        <h3 className='ModalAddContact__Header'>Заявка (Новый контакт)</h3>

        <form
          className='ModalAddContact__Form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name='fullName'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='ФИО'
                label='ФИО'
                error={errors.fullName && errors.fullName.message}
              />
            )}
          />
          <Controller
            control={control}
            name='company'
            rules={companyValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Место работы'
                label='Место работы'
                error={errors.company && errors.company.message}
              />
            )}
          />
          <Controller
            control={control}
            name='type'
            rules={fullNameValidation}
            render={({ field }) => (
              <SelectForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={options}
                label='Тип'
                error={errors.type && errors.type.message}
              />
            )}
          />
          <Controller
            control={control}
            name='position'
            rules={fullNameValidation}
            render={({ field }) => (
              <SelectForm
                className='CustomSelect'
                iconType={'search'}
                inputValue={inputSpecialties}
                onInputChange={setInputSpecialties}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={specialtiesList}
                label='Специальность'
                error={errors.position && errors.position.message}
                isOptionDisabled={!inputSpecialties.length}
                сlearable={true}
              />
            )}
          />
          <PhoneInput control={control} errors={errors} />
          <Controller
            control={control}
            name='email'
            rules={emailValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Email'
                label='Email'
                error={errors.email && errors.email.message}
              />
            )}
          />
          <AddressInputControl control={control} errors={errors} />
          <div className='ModalAddContact__ButtonGroup'>
            <Button className='ButtonCancel' onClick={onCancel}>
              Отмена
            </Button>
            <Button className='ButtonCreate' type='submit'>
              Создать
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
