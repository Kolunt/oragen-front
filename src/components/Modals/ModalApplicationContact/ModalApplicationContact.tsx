import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  companyValidation,
  emailValidation,
  fullNameValidation,
} from 'validation/validation';
import { useContactsStore } from 'store/useContactsStore';
import { useModalsStore } from 'store/useModalsStore';
import {
  Button,
  InputForm,
  ISelectOption,
  Modal,
  PhoneInput,
  SelectForm,
} from 'ui-kit';
import {
  CreateContactApplicationType,
  useApplicationsStore,
} from 'store/useApplicationsStore';
import { OrganizationTypes } from 'enums';
import { useSelectOptions } from 'hooks';
import { useCommonStore } from 'store/useCommonStore';
import { AddressInputControl } from 'ui-kit/InputForm/AddressInputControl/AddressInputControl';
import './ModalApplicationContact.scss';
import { useDebounceSelect } from 'hooks/useDebounceSelect';

const options: ISelectOption[] = [
  { value: OrganizationTypes.MPI, label: 'ЛПУ' },
  { value: OrganizationTypes.PHARMACY, label: 'Аптека' },
];

interface IContactForm {
  fullName: string;
  phone: string;
  position: ISelectOption;
  type: ISelectOption;
  company: string;
  address: any;
  email: string;
}

export const ModalApplicationContact = () => {
  const isShowModal = useModalsStore((state) => state.isApplicationContact);
  const changeShowModal = useModalsStore(
    (state) => state.handleApplicationContact
  );
  const addContactApplication = useApplicationsStore(
    (state) => state.addContactApplication
  );
  const monitoredContactId = useContactsStore(
    (state) => state.monitoredContactId
  );
  const monitoredContact = useContactsStore((state) => state.monitoredContact);
  const getMonitoredContact = useContactsStore(
    (state) => state.getMonitoredContact
  );
  const specialties = useCommonStore((state) => state.specialties);
  const getSpecialties = useCommonStore((state) => state.getSpecialties);
  const [inputSpecialties, setInputSpecialties] = useState<string>('');

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<IContactForm>({
    defaultValues: {
      fullName: '',
      phone: '+7',
      email: '',
      position: undefined,
      company: '',
      address: undefined,
      type: undefined,
    },
  });
  useEffect(() => {
    if (monitoredContactId && isShowModal) {
      getMonitoredContact(monitoredContactId);
    }
  }, [monitoredContactId]);

  const findOption = (array: ISelectOption[], value: string) => {
    return array.find((item) => item.value === value);
  };

  useEffect(() => {
    if (monitoredContact && isShowModal) {
      setValue('fullName', monitoredContact.full_name);
      setValue('company', monitoredContact.company);
      setValue('phone', monitoredContact.phone);
      setValue('email', monitoredContact.email);
      setValue('position', {
        value: monitoredContact.position,
        label: monitoredContact.position,
      });
      setValue('address', { value: monitoredContact.address });
      //@ts-ignore
      setValue('type', findOption(options, monitoredContact.organization_type));
    }
  }, [monitoredContact.id, isShowModal]);

  useDebounceSelect(inputSpecialties, getSpecialties);

  const onSubmit: SubmitHandler<IContactForm> = (data) => {
    const { fullName, company, phone, position, address, type, email } = data;
    const newContactApplication: CreateContactApplicationType = {
      id: +monitoredContact.id,
      full_name: fullName,
      company: company,
      phone: phone,
      position: position.label,
      organization_type: type.value,
      address: address.value,
      email: email,
    };
    addContactApplication(newContactApplication);
    onCancel();
  };

  const onCancel = () => {
    reset();
    changeShowModal(false);
  };

  const specialtiesList = useSelectOptions(specialties, 'id', 'name');

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalApplicationContact'>
        <h3 className='ModalApplicationContact__Header'>
          Заявка (Изменить контакт)
        </h3>
        <form
          className='ModalApplicationContact__Form'
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
          <div className='ModalApplicationContact__ButtonGroup'>
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
