import React, { useEffect } from 'react';
import './ModalChangeVisitDate.scss';
import { Button, DatePickerTiming, Modal, TextArea } from 'ui-kit';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { dateValidation, fullNameValidation } from 'validation/validation';
import { useModalsStore } from 'store/useModalsStore';
import { IUpdateVisitDatePayload } from 'api/visitsApi';
import { useCurrentVisitsStore } from 'pages';
import dayjs from 'dayjs';
import { useVisitsStore } from 'store/useVisitsStore';

interface IChangeVisitDateForm {
  date: Date;
  comment: string;
}

export const ModalChangeVisitDate = () => {
  const isShowModal = useModalsStore((state) => state.isChangeVisitDate);
  const changeShowModal = useModalsStore(
    (state) => state.handleChangeVisitDate
  );
  const monitoredVisit = useVisitsStore((state) => state.monitoredVisit);
  const updateVisitDate = useCurrentVisitsStore(
    (state) => state.updateVisitDate
  );

  useEffect(() => {
    if (monitoredVisit.planned_at && isShowModal) {
      setValue('date', dayjs(monitoredVisit.planned_at).toDate());
    }
  }, [monitoredVisit.planned_at, isShowModal]);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IChangeVisitDateForm>({
    defaultValues: {
      date: new Date(),
      comment: '',
    },
  });

  const onCancel = () => {
    reset();
    changeShowModal(false);
  };

  const onSubmit: SubmitHandler<IChangeVisitDateForm> = (data) => {
    const payload: IUpdateVisitDatePayload = {
      id: 1,
      newDate: data.date.toISOString(),
      comment: data.comment,
    };
    updateVisitDate(payload);
    onCancel();
  };

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddVisit'>
        <h3 className='ModalAddVisit__Header'>Изменить визит</h3>

        <form className='ModalAddVisit__Form' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='date'
            rules={dateValidation}
            render={({ field }) => (
              <DatePickerTiming
                className={'CustomDatePicker'}
                label='Дата визита'
                value={field.value}
                changeValue={(e) => field.onChange(e)}
              />
            )}
          />
          <Controller
            control={control}
            name='comment'
            rules={fullNameValidation}
            render={({ field }) => (
              <TextArea
                className='CustomTextArea'
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Комментарий'
                label='Комментарий'
                error={errors.comment && errors.comment.message}
              />
            )}
          />
          <div className='ModalAddVisit__ButtonGroup'>
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
