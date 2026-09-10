import React, { useEffect } from 'react';

import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';

import {
  addressValidation,
  employeesValidation,
  fullNameValidation,
} from 'validation/validation';
import { useModalsStore } from 'store/useModalsStore';
import {
  IOrganization,
  useOrganizationsStore,
} from 'store/useOrganizationsStore';
import { Button, InputForm, Modal, ISelectOption, SelectForm } from 'ui-kit';
import './ModalChangeOrganization.scss';
import { OrganizationTypes } from 'enums';
import { OrganizationType } from 'TypeInterface';

const options: ISelectOption[] = [
  { value: OrganizationTypes.MPI, label: 'ЛПУ' },
  { value: OrganizationTypes.PHARMACY, label: 'Аптека' },
];

interface IChangeOrganizationForm {
  name: string;
  numberOfEmployees: string;
  type: ISelectOption;
  address: string;
}

export const ModalChangeOrganization = () => {
  const { handleSubmit, control, reset, setValue } =
    useForm<IChangeOrganizationForm>({
      defaultValues: {
        name: '',
        numberOfEmployees: '',
        type: undefined,
        address: '',
      },
    });
  const { errors } = useFormState({ control });
  const isShowModal = useModalsStore((state) => state.isChangeOrganization);
  const changeShowModal = useModalsStore(
    (state) => state.handleChangeOrganization
  );
  const idOrganization = useModalsStore((state) => state.organizationId);
  const changeOrganization = useOrganizationsStore(
    (state) => state.changeOrganization
  );
  const organizations = useOrganizationsStore((state) => state.organizations);
  const organization = organizations.find((item) => item.id === idOrganization);

  useEffect(() => {
    if (organization) {
      setValue('name', organization.name);
      setValue('numberOfEmployees', organization.number_of_employees);
      setValue('address', organization.address);
    }
  }, [organization]);

  const onSubmit: SubmitHandler<IChangeOrganizationForm> = (data) => {
    const newData: IOrganization = {
      id: idOrganization,
      name: data.name,
      number_of_employees: data.numberOfEmployees,
      organization_type: data.type.value as OrganizationType,
      address: data.address,
      created_at: new Date(),
      updated_at: new Date(),
    };

    changeOrganization(idOrganization, newData);
    changeShowModal(false);
    reset();
  };

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalChangeOrganization'>
        <h3 className='ModalChangeOrganization__Header'>Изменить данные</h3>

        <form
          className='ModalChangeOrganization__Form'
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
            rules={{ required: true }}
            render={({ field }) => (
              <SelectForm
                className='Select'
                // @ts-ignore
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={options}
                label='Тип'
              />
            )}
          />
          <Controller
            control={control}
            name='address'
            rules={addressValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Адрес'
                label='Адрес'
                error={errors.address && errors.address.message}
              />
            )}
          />
          <div className='ModalChangeOrganization__ButtonGroup'>
            <Button
              className='ButtonCancel'
              onClick={() => changeShowModal(false)}
            >
              Отмена
            </Button>
            <Button className='ButtonCreate' type='submit'>
              Изменить
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
