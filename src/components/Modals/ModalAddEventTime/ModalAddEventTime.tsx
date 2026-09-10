import React from 'react';
import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState,
} from 'react-hook-form';
import { numberValidation } from 'validation/validation';
import { Button, InputForm, Modal } from 'ui-kit';
import { useModalsStore } from 'store/useModalsStore';
import { useEventsStore } from 'store/useEventsStore';
import { IPlusDurationEvent } from 'api/eventsApi';
import './ModalAddEventTime.scss';

interface IAddEventTime {
  duration: string;
}

export const ModalAddEventTime = () => {
  const { handleSubmit, control, reset } = useForm<IAddEventTime>({
    defaultValues: {
      duration: '',
    },
  });
  const { errors } = useFormState({ control });
  const isShowModal = useModalsStore((state) => state.isAddEventTime);
  const changeShowModal = useModalsStore((state) => state.handleAddEventTime);
  const currentEvent = useEventsStore((state) => state.monitoredEvent);
  const addNewDuration = useEventsStore((state) => state.plusDuration);

  const onSubmit: SubmitHandler<IAddEventTime> = (data) => {
    const payload: IPlusDurationEvent = {
      id: currentEvent.id,
      duration: +data.duration,
    };
    addNewDuration(payload);
    changeShowModal(false);
    reset();
  };

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddEvent'>
        <h3 className='ModalAddEvent__Header'>Добавить время (мин)</h3>

        <form className='ModalAddEvent__Form' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='duration'
            rules={numberValidation}
            render={({ field }) => (
              <InputForm
                type={'number'}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Добавить время мероприятия (мин)'
                label='Добавить время мероприятия (мин)'
                error={errors.duration && errors.duration.message}
              />
            )}
          />
          <div className='ModalAddEvent__ButtonGroup'>
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
