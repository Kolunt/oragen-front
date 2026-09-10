import React, { ChangeEvent, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  fullNameValidation,
  numberValidation,
  participantsValidation,
} from 'validation/validation';
import { ICreateEventPayload, useEventsStore } from 'store/useEventsStore';
import { useModalsStore } from 'store/useModalsStore';
import {
  Button,
  InputForm,
  ISelectOption,
  Modal,
  SelectForm,
  TextArea,
} from 'ui-kit';
import { EventTypes } from 'enums';
import './ModalAddEvent.scss';
import { DatePicker } from 'antd';
import { disabledDateRangePicker } from 'utils';
import { useAddVisitStore } from 'components/Modals/ModalAddVisit/useAddVisitStore';
import { useDebounceSelect, useSelectOptions } from 'hooks';
import { getValue } from '@testing-library/user-event/dist/utils';

const options: ISelectOption[] = [
  { value: EventTypes.VIDEO_CONFERENCING, label: 'Видеоконференция' },
  { value: EventTypes.ROUND_TABLES, label: 'Круглый стол' },
  { value: EventTypes.ONLINE_RESIDENTS, label: 'Онлайн-ординаторская' },
];

interface IEventForm {
  // participantsList: ISelectOption[];
  type: ISelectOption;
  plannedDate: Date;
  name: string;
  description: string;
  // participants: string;
  duration: string;
}

export const ModalAddEvent = () => {
  const isShowModal = useModalsStore((state) => state.isEvent);
  const changeShowModal = useModalsStore((state) => state.handleEvent);
  const addEvent = useEventsStore((state) => state.addEvent);
  const contacts = useAddVisitStore((state) => state.contacts);
  const getContacts = useAddVisitStore((state) => state.getContacts);
  const [inputContact, setInputContact] = useState<string>('');
  const [participants, setParticipants] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IEventForm>({
    defaultValues: {
      // participantsList: undefined,
      type: undefined,
      name: '',
      description: '',
      // participants: '',
      duration: '',
    },
  });

  const changeNumberParticipants = ({
    currentTarget: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (value) {
      let count = +value;
      if (count < 0) count = 0;
      if (count > 15) count = 15;
      setParticipants(count);
    }
  };

  const handlerCount = ({ length }: any) => {
    setCount(length);
  };

  const placeholderParticipants = useMemo(() => {
    let check = participants - count;

    return `Выбор участников ( Осталось мест : ${check} )`;
  }, [count, participants]);

  const onSubmit: SubmitHandler<IEventForm> = (data) => {
    let participantsListData = new Array<number>();
    /*    if (data.participantsList !== undefined) {
      participantsListData = data.participantsList.map((item) => +item.value);
    }*/

    const newEvent: ICreateEventPayload = {
      name: data.name,
      type: 'call',
      duration: +data.duration,
      // participants: +data.participants + 1,
      participants: 15,
      // participantsList: participantsListData,
      participantsList: [],
      started_at: data.plannedDate.toISOString(),
      description: data.description,
    };
    addEvent(newEvent);
    changeShowModal(false);
    reset();
  };

  const onCancel = () => {
    reset();
    changeShowModal(false);
  };

  useDebounceSelect(inputContact, getContacts);
  const contactsList = useSelectOptions(contacts, 'id', 'full_name');

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddEvent'>
        <h3 className='ModalAddEvent__Header'>Новое мероприятие</h3>

        <form className='ModalAddEvent__Form' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='name'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Название'
                label='Название'
                error={errors.name && errors.name.message}
              />
            )}
          />
          {/*          <Controller
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
          />*/}
          <Controller
            control={control}
            name='description'
            rules={fullNameValidation}
            render={({ field }) => (
              <TextArea
                className='CustomTextArea'
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Описание мероприятия'
                label='Описание мероприятия'
                error={errors.description && errors.description.message}
              />
            )}
          />
          {/*          <Controller
            control={control}
            name='participants'
            rules={participantsValidation}
            render={({ field }) => (
              <InputForm
                type={'number'}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  changeNumberParticipants(e);
                }}
                placeholder='Количество участников'
                label='Количество участников'
                error={errors.participants && errors.participants.message}
              />
            )}
          />*/}
          {/*          <Controller
            control={control}
            name='participantsList'
            rules={{ required: false }}
            render={({ field }) => (
              <SelectForm
                iconType={'search'}
                inputValue={inputContact}
                onInputChange={setInputContact}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={contactsList}
                label='Участники'
                isMulti={true}
                error={
                  errors.participantsList && errors.participantsList.message
                }
                isOptionDisabled={!inputContact.length}
              />
            )}
          />*/}
          <Controller
            control={control}
            name='plannedDate'
            rules={fullNameValidation}
            render={({ field }) => (
              <div className='date-picker'>
                <label>Дата</label>
                <DatePicker
                  onChange={(e) => field.onChange(e)}
                  format={'DD.MM.YYYY HH:mm'}
                  showTime={{ format: 'HH:mm', minuteStep: 5 }}
                  superNextIcon={false}
                  superPrevIcon={false}
                  showNow={false}
                  placeholder={'Не выбрано'}
                  disabledDate={disabledDateRangePicker}
                  status={errors.plannedDate && 'error'}
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name='duration'
            rules={numberValidation}
            render={({ field }) => (
              <InputForm
                type={'number'}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Продолжительность мероприятия'
                label='Продолжительность мероприятия'
                error={errors.duration && errors.duration.message}
              />
            )}
          />
          <div className='mt-20 flex gap-x-20'>
            <Button className='btn cancel' onClick={onCancel}>
              Отмена
            </Button>
            <Button className='w-full' type='submit'>
              Создать
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
