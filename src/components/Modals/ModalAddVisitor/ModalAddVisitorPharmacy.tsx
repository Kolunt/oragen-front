import React, { useEffect, useState } from 'react';
import { Button, ISelectOption, Modal, SelectForm } from 'ui-kit';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSelectOptions } from 'hooks';
import { useCurrentVisitsPharmacyStore, usePharmacyInfoStore } from 'pages';
import { IUpdateVisitParticipantsPayload } from 'api/visitsApi';
import { useVisitsPharmacyStore } from 'store/useVisitsPharmacyStore';
import { useAddVisitorPharmacyStore } from 'components/Modals/ModalAddVisitor/useAddVisitorPharmacyStore';
import './ModalAddVisitor.scss';

interface IAddVisitorForm {
  watchers: ISelectOption[];
}

export const ModalAddVisitorPharmacy = () => {
  const changeParticipants = useCurrentVisitsPharmacyStore(
    (state) => state.changeAttendeesList
  );
  const isShowModal = useAddVisitorPharmacyStore((state) => state.isShow);
  const changeShowModal = useAddVisitorPharmacyStore(
    (state) => state.changeIsShow
  );
  const users = useAddVisitorPharmacyStore((state) => state.users);
  const getUsers = useAddVisitorPharmacyStore((state) => state.getUsers);
  const participants = useAddVisitorPharmacyStore(
    (state) => state.participants
  );
  const monitoredVisitId = useVisitsPharmacyStore(
    (state) => state.monitoredVisitId
  );
  const [inputWatchers, setInputWatchers] = useState<string>('');
  const { handleSubmit, control, setValue } = useForm<IAddVisitorForm>();

  useEffect(() => {
    let data: ISelectOption[] = [];
    participants.forEach((item) => {
      data.push({ value: `${item.id}`, label: item.name });
    });
    setValue('watchers', data);
  }, [participants, isShowModal]);

  useEffect(() => {
    if (inputWatchers.length) {
      getUsers(inputWatchers);
    }
  }, [inputWatchers]);

  const onSubmit: SubmitHandler<IAddVisitorForm> = (data) => {
    const watchers = data.watchers
      ? data.watchers.map((item) => +item.value)
      : [];
    const payload: IUpdateVisitParticipantsPayload = {
      visit_id: monitoredVisitId as number,
      participants: watchers.join(','),
    };
    changeParticipants(payload);
    onCancel();
  };

  const onCancel = () => {
    changeShowModal(false);
  };

  const watchers = useSelectOptions(users, 'id', 'name');

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddVisitor'>
        <h3 className='ModalAddVisitor__Header'>Изменить участников визита</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='watchers'
            render={({ field }) => (
              <SelectForm
                iconType='search'
                className='CustomSelect'
                inputValue={inputWatchers}
                onInputChange={setInputWatchers}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={watchers}
                label='Участники'
                isOptionDisabled={inputWatchers.length < 1}
                isMulti={true}
              />
            )}
          />
          <div className='mt-30 flex gap-x-20'>
            <Button className='ButtonCancel' onClick={onCancel}>
              Отмена
            </Button>
            <Button className='w-full' type='submit'>
              Изменить
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
