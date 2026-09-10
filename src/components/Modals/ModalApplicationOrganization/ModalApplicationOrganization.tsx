import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { employeesValidation, fullNameValidation } from 'validation/validation';
import { useModalsStore } from 'store/useModalsStore';
import { useOrganizationsStore } from 'store/useOrganizationsStore';
import {
  Button,
  InputForm,
  ISelectOption,
  Modal,
  PhoneInput,
  SelectForm,
} from 'ui-kit';
import {
  CreateOrganizationApplicationType,
  useApplicationsStore,
} from 'store/useApplicationsStore';
import { OrganizationTypes } from 'enums';
import './ModalApplicationOrganization.scss';
import { AddressInputControl } from 'ui-kit/InputForm/AddressInputControl/AddressInputControl';

const options: ISelectOption[] = [
  { value: OrganizationTypes.MPI, label: 'ЛПУ' },
  { value: OrganizationTypes.PHARMACY, label: 'Аптека' },
];

// todo тоже самое что ModalAddOrganization
interface IOrganizationForm {
  name: string;
  numberOfEmployees: string;
  type: ISelectOption;
  address: any;
  phone: string;
}

export const ModalApplicationOrganization = () => {
  const isShowModal = useModalsStore(
    (state) => state.isApplicationOrganization
  );
  const changeShowModal = useModalsStore(
    (state) => state.handleApplicationOrganization
  );
  const addOrganizationApplication = useApplicationsStore(
    (state) => state.addOrganizationApplication
  );
  const monitoredOrganizationId = useOrganizationsStore(
    (state) => state.monitoredOrganizationId
  );
  const monitoredOrganization = useOrganizationsStore(
    (state) => state.monitoredOrganization
  );
  const getMonitoredContact = useOrganizationsStore(
    (state) => state.getMonitoredOrganization
  );
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<IOrganizationForm>({
    defaultValues: {
      name: '',
      numberOfEmployees: '',
      type: undefined,
      address: '',
      phone: '+7',
    },
  });

  useEffect(() => {
    if (monitoredOrganizationId && isShowModal) {
      getMonitoredContact(monitoredOrganizationId);
    }
  }, [monitoredOrganizationId]);

  const findOption = (array: ISelectOption[], value: string) => {
    return array.find((item) => item.value === value);
  };

  useEffect(() => {
    if (monitoredOrganization && isShowModal) {
      setValue('name', monitoredOrganization.name);
      setValue('numberOfEmployees', monitoredOrganization.number_of_employees);
      setValue('address', { value: monitoredOrganization.address });
      //@ts-ignore
      setValue('phone', monitoredOrganization.phone);
      setValue(
        'type',
        //@ts-ignore
        findOption(options, monitoredOrganization.organization_type)
      );
    }
  }, [monitoredOrganization.id, isShowModal]);

  const onSubmit: SubmitHandler<IOrganizationForm> = (data) => {
    const newOrganizationApplication: CreateOrganizationApplicationType = {
      id: +monitoredOrganization.id,
      name: data.name,
      number_of_employees: data.numberOfEmployees,
      organization_type: data.type.value,
      address: data.address.value,
      phone: data.phone,
    };
    addOrganizationApplication(newOrganizationApplication);
    onCancel();
  };

  const onCancel = () => {
    reset();
    changeShowModal(false);
  };

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalApplicationOrganization'>
        <h3 className='ModalApplicationOrganization__Header'>
          Заявка (Изменить организацию)
        </h3>

        <form
          className='ModalApplicationOrganization__Form'
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
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={options}
                label='Тип'
              />
            )}
          />
          <PhoneInput control={control} errors={errors} />
          <AddressInputControl control={control} errors={errors} />
          <div className='ModalApplicationOrganization__ButtonGroup'>
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
