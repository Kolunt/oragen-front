import React, { useEffect, useState } from 'react';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import { IContact, useContactsStore } from 'store/useContactsStore';
import { useModalsStore } from 'store/useModalsStore';
import { Button, ISelectOption, Modal, SelectForm } from 'ui-kit';
import { useEventsStore } from 'store/useEventsStore';
import { MultiValue, SingleValue } from 'react-select';
import './ModalAddPeople.scss';

interface IPeopleForm {
  people: ISelectOption[];
}

export const ModalAddPeople = () => {
  const { handleSubmit, control, reset, setValue } = useForm<IPeopleForm>({
    defaultValues: {
      people: undefined,
    },
  });
  const { errors } = useFormState({ control });

  const isShowModal = useModalsStore((state) => state.isPeople);
  const changeShowModal = useModalsStore((state) => state.handlePeople);
  // const addPeople = useEventsStore((state) => state.addPeople);
  const events = useEventsStore((state) => state.events);
  const eventId = useModalsStore((state) => state.isPeopleId);
  const contacts = useContactsStore((state) => state.contacts);
  const [selectedContacts, setSelectedContacts] = useState<IContact[]>([]);
  const [contactSelection, setContactSelection] = useState<ISelectOption[]>([]);
  const [contact, setContact] = useState<IContact>();

  // useEffect(() => {
  //   const data = events.find((item) => item.id === eventId);
  //   if (data) {
  //     setSelectedContacts(data.people);
  //   }
  // }, [eventId, events]);

  useEffect(() => {
    const dataMap: ISelectOption[] = [];

    const filteredContacts = contacts.filter((item) =>
      selectedContacts.every((contact) => contact.id !== item.id)
    );

    for (let i = 0; i < filteredContacts.length; i++) {
      dataMap.push({
        value: filteredContacts[i].id,
        label: filteredContacts[i].full_name,
      });
    }
    setContactSelection(dataMap);
  }, [selectedContacts]);

  const handleContact = (
    event: SingleValue<ISelectOption> | MultiValue<ISelectOption>
  ) => {
    if (event) {
      //@ts-ignore
      const data = contacts.find((item) => item.fullName === event.label);
      setContact(data);
    }
  };

  const onSubmit: SubmitHandler<IPeopleForm> = (data) => {
    if (contact) {
      const newPeople: IContact = {
        id: contact.id,
        full_name: contact.full_name,
        phone: contact.phone,
        company: contact.company,
        position: contact.position,
        organization_type: contact.organization_type,
        address: contact.address,
        email: contact.email,
        created_at: new Date(),
        updated_at: new Date(),
      };
      // addPeople(eventId, newPeople);
      changeShowModal(false);
      reset();
    }
  };

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddPeople'>
        <h3 className='ModalAddPeople__Header'>Добавить участников</h3>

        <form
          className='ModalAddPeople__Form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name='people'
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
                label='Участники'
              />
            )}
          />
          <div className='ModalAddPeople__ButtonGroup'>
            <Button
              className='ButtonCancel'
              onClick={() => changeShowModal(false)}
            >
              Отмена
            </Button>
            <Button className='ButtonCreate' type='submit'>
              Добавить
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
