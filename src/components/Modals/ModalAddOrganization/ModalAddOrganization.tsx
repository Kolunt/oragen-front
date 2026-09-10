import React, { useState } from 'react';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { employeesValidation, fullNameValidation } from 'validation/validation';
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
  CreateOrganizationApplicationType,
  useApplicationsStore,
} from 'store/useApplicationsStore';
import { AddressInputControl } from 'ui-kit/InputForm/AddressInputControl/AddressInputControl';
import './ModalAddOrganization.scss';
import { NumericInput } from 'ui-kit/InputForm/InputFormNumber/InputFormNumber';

const options: ISelectOption[] = [
  { value: OrganizationTypes.MPI, label: 'ЛПУ' },
  { value: OrganizationTypes.PHARMACY, label: 'Аптека' },
];

// todo тоже самое что ModalApplicationOrganization
interface IOrganizationForm {
  name: string;
  numberOfEmployees: string;
  type: ISelectOption;
  phone: string;
  address: any;
}

export const ModalAddOrganization = () => {
  const isShowModal = useModalsStore((state) => state.isOrganization);
  const changeShowModal = useModalsStore((state) => state.handleOrganization);
  const addOrganizationApplication = useApplicationsStore(
    (state) => state.addOrganizationApplication
  );
  const [value, setValue] = useState('');
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IOrganizationForm>({
    defaultValues: {
      name: '',
      numberOfEmployees: '',
      type: undefined,
      phone: '+7',
      address: undefined,
    },
  });

  const onSubmit: SubmitHandler<IOrganizationForm> = (data) => {
    const newOrganization: CreateOrganizationApplicationType = {
      name: data.name,
      number_of_employees: data.numberOfEmployees,
      organization_type: data.type.value,
      address: data.address.value,
      phone: data.phone,
    };
    addOrganizationApplication(newOrganization);
    onCancel();
  };

  const onCancel = () => {
    reset();
    changeShowModal(false);
  };

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddOrganization'>
        <h3 className='ModalAddOrganization__Header'>
          Заявка (Новая организация)
        </h3>

        <form
          className='ModalAddOrganization__Form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name='name'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Название компании'
                label='Название'
                error={errors.name && errors.name.message}
              />
            )}
          />
          <Controller
            control={control}
            name='numberOfEmployees'
            rules={employeesValidation}
            render={({ field }) => (
              <InputForm
                type='number'
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Кол-во сотрудников'
                label='Сотрудники'
                error={
                  errors.numberOfEmployees && errors.numberOfEmployees.message
                }
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
          <PhoneInput control={control} errors={errors} />
          <AddressInputControl control={control} errors={errors} />
          <div className='ModalAddOrganization__ButtonGroup'>
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
