import React, { useEffect, useState } from 'react';

import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';

import { companyValidation, positionValidation } from 'validation/validation';
import { useModalsStore } from 'store/useModalsStore';
import {
  Button,
  InputForm,
  ISelectOption,
  Modal,
  PhoneInput,
  SelectForm,
} from 'ui-kit';
import './ModalAddTarget.scss';
import { IContact, useContactsStore } from 'store/useContactsStore';
import { MultiValue, SingleValue } from 'react-select';

interface ITargetForm {
  name: ISelectOption;
  phone: string;
  position: string;
  company: string;
}

export const ModalAddTarget = () => {
  const { handleSubmit, control, reset, setValue } = useForm<ITargetForm>({
    defaultValues: {
      name: undefined,
      phone: '+7',
      position: '',
      company: '',
    },
  });
  const { errors } = useFormState({ control });
  // const addTarget = useTargetsStore((state) => state.addTarget);
  const isShowModal = useModalsStore((state) => state.isContactOnTarget);
  const changeShowModal = useModalsStore(
    (state) => state.handleContactOnTarget
  );
  const contacts = useContactsStore((state) => state.contacts);
  const [contactSelection, setContactSelection] = useState<ISelectOption[]>([]);
  const [contact, setContact] = useState<IContact>();

  useEffect(() => {
    const dataMap: ISelectOption[] = [];
    for (let i = 0; i < contacts.length; i++) {
      dataMap.push({ value: contacts[i].id, label: contacts[i].full_name });
    }
    setContactSelection(dataMap);
  }, []);

  useEffect(() => {
    if (contact) {
      setValue('phone', contact.phone);
      setValue('position', contact.position);
      setValue('company', contact.company);
    }
  }, [contact]);

  const handleContact = (
    event: SingleValue<ISelectOption> | MultiValue<ISelectOption>
  ) => {
    if (event) {
      //@ts-ignore
      const data = contacts.find((item) => item.fullName === event.label);
      setContact(data);
    }
  };

  const onSubmit: SubmitHandler<ITargetForm> = (data) => {
    /*    const id = v1();
    const newTarget: ITarget = {
      id,
      fullName: data.name.label,
      phone: data.phone,
      position: data.position,
      address: contact?.address || '',
      type: contact?.organization_type as OrganizationType,
      company: data.company,
      email: contact?.email || '',
      visitsPlanned: 0,
      visitsPerformed: 0,
      creationDate: new Date(),
    };

    addTarget(newTarget);
    changeShowModal(false);
    reset();*/
  };

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddTarget'>
        <h3 className='ModalAddTarget__Header'>Новый таргет</h3>

        <form
          className='ModalAddTarget__Form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name='name'
            rules={{ required: true }}
            render={({ field }) => (
              <SelectForm
                className='Select'
                value={field.value}
                onChange={(e) => {
                  handleContact(e);
                  field.onChange(e);
                }}
                options={contactSelection}
                label='Выбор контакта'
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

          <div className='ModalAddTarget__ButtonGroup'>
            <Button
              className='ButtonCancel'
              onClick={() => changeShowModal(false)}
            >
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
