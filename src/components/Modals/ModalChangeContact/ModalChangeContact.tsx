import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  addressValidation,
  companyValidation,
  fullNameValidation,
  positionValidation,
} from 'validation/validation';
import { IContact, useContactsStore } from 'store/useContactsStore';
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
import { OrganizationType } from 'TypeInterface';
import './ModalChangeContact.scss';

const options: ISelectOption[] = [
  { value: OrganizationTypes.MPI, label: 'ЛПУ' },
  { value: OrganizationTypes.PHARMACY, label: 'Аптека' },
];

interface IContactForm {
  fullName: string;
  phone: string;
  position: string;
  type: ISelectOption;
  company: string;
  address: string;
  email: string;
}

export const ModalChangeContact = () => {
  const isShowModal = useModalsStore((state) => state.isChangeContact);
  const changeShowModal = useModalsStore((state) => state.handleChangeContact);
  const idContact = useModalsStore((state) => state.contactId);
  const changeContact = useContactsStore((state) => state.changeContact);
  // const changeNews = useNewsStore((state) => state.changeNews);
  const contacts = useContactsStore((state) => state.contacts);
  const contact = contacts.find((item) => item.id === idContact);
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IContactForm>({
    defaultValues: {
      fullName: '',
      phone: '+7',
      email: '',
      position: '',
      company: '',
      address: '',
      type: undefined,
    },
  });

  useEffect(() => {
    if (contact && isShowModal) {
      setValue('fullName', contact.full_name);
      setValue('company', contact.company);
      setValue('phone', contact.phone);
      setValue('email', contact.email);
      setValue('position', contact.position);
      setValue('address', contact.address);

      const contactType =
        contact.organization_type === OrganizationTypes.MPI
          ? { value: OrganizationTypes.MPI, label: 'ЛПУ' }
          : { value: OrganizationTypes.PHARMACY, label: 'Аптека' };

      setValue('type', contactType);
    }
  }, [isShowModal]);

  const onSubmit: SubmitHandler<IContactForm> = (data) => {
    const newData: IContact = {
      id: idContact,
      full_name: data.fullName,
      phone: data.phone,
      email: data.email,
      position: data.position,
      company: data.company,
      address: data.address,
      organization_type: data.type.value as OrganizationType,
      created_at: new Date(),
      updated_at: new Date(),
    };

    changeContact(idContact, newData);
    onCancel();
  };

  const onCancel = () => {
    reset();
    changeShowModal(false);
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
            name='position'
            rules={positionValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Специальность'
                label='Специальность'
                error={errors.position && errors.position.message}
              />
            )}
          />
          <PhoneInput control={control} errors={errors} />
          <Controller
            control={control}
            name='email'
            rules={positionValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Email'
                label='Email'
                error={errors.position && errors.position.message}
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
            <Button className='ButtonCancel' onClick={onCancel}>
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
