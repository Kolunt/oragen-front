import React, { useEffect, useState } from 'react';
import { Button, DatePickerTiming, InputForm, Modal, TextArea } from 'ui-kit';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { dateValidation, fullNameValidation } from 'validation/validation';
import { useModalsStore } from 'store/useModalsStore';
import { useUserStore } from 'store/useUserStore';
import { getUtcDate } from 'utils';
import {
  ISetAcceptVisitPayload,
  ISetApprovalStatusVisitPayload,
  IUpdateVisitDatePayload,
} from 'api/visitsApi';
import dayjs from 'dayjs';
import { DateFormats } from 'enums';
import { useVisitsPharmacyStore } from 'store/useVisitsPharmacyStore';
import { useCurrentVisitsPharmacyStore } from 'pages';

interface IVisitFormMR {
  date: Date;
  comment?: string;
}

export type ChangeStatusVisitType = 'accept' | 'decline' | 'cancel' | 'save';

export const ModalChangeVisitPharmacyMR = () => {
  const isShowModal = useModalsStore((state) => state.isChangeVisitPharmacyMR);
  const changeShowModal = useModalsStore(
    (state) => state.handleChangeVisitPharmacyMR
  );
  const monitoredVisitId = useVisitsPharmacyStore(
    (state) => state.monitoredVisitId
  );
  const getMonitoredVisit = useVisitsPharmacyStore(
    (state) => state.getMonitoredVisit
  );
  const monitoredVisit = useVisitsPharmacyStore(
    (state) => state.monitoredVisit
  );
  const acceptVisit = useCurrentVisitsPharmacyStore(
    (state) => state.acceptVisit
  );
  const declineVisit = useCurrentVisitsPharmacyStore(
    (state) => state.declineVisit
  );
  const cancelVisit = useCurrentVisitsPharmacyStore(
    (state) => state.cancelVisit
  );
  const updateVisitDate = useCurrentVisitsPharmacyStore(
    (state) => state.updateVisitDate
  );
  const user = useUserStore((state) => state.me);
  const [typeAction, setTypeAction] = useState<ChangeStatusVisitType>('accept');

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IVisitFormMR>({
    defaultValues: {
      date: undefined,
      comment: '',
    },
  });

  useEffect(() => {
    if (isShowModal && monitoredVisitId) {
      getMonitoredVisit(monitoredVisitId);
      reset();
    }
  }, [monitoredVisitId, isShowModal]);

  useEffect(() => {
    if (monitoredVisit.planned_at) {
      setValue('date', getUtcDate(monitoredVisit.planned_at));
    } else {
      setValue('date', new Date());
    }
  }, [monitoredVisit.planned_at, isShowModal]);

  const onSubmit: SubmitHandler<IVisitFormMR> = (data) => {
    if (typeAction === 'accept') {
      const payload = {
        id: monitoredVisit.id,
        plannedDate: data.date.toISOString(),
        comment: `Принят в работу ${dayjs(new Date()).format(
          DateFormats.FULL_DATE_FORMAT
        )}`,
      };
      acceptVisit(payload as Omit<ISetAcceptVisitPayload, 'duration'>);
      reset();
      changeShowModal(false);
    }

    if (typeAction === 'decline') {
      const payload: ISetApprovalStatusVisitPayload = {
        id: monitoredVisit.id,
        plannedDate: data.date.toISOString(),
        comment: data.comment,
      };
      declineVisit(payload);
      setTypeAction('accept');
      reset();
      changeShowModal(false);
    }

    if (typeAction === 'cancel') {
      const payload: ISetApprovalStatusVisitPayload = {
        id: monitoredVisit.id,
        plannedDate: data.date.toISOString(),
        comment: data.comment,
      };
      cancelVisit(payload);
      setTypeAction('accept');
      reset();
      changeShowModal(false);
    }

    if (typeAction === 'save') {
      const payload: IUpdateVisitDatePayload = {
        id: monitoredVisit.id,
        newDate: data.date.toISOString(),
        comment: data.comment,
      };
      updateVisitDate(payload);
      setTypeAction('accept');
      reset();
      changeShowModal(false);
    }
  };
  return (
    <Modal
      visibility={isShowModal}
      changeVisibility={changeShowModal}
      isIcon={true}
    >
      <div className='ModalChangeVisitMR'>
        <h3 className='ModalChangeVisitMR__Header'>Изменить визит</h3>

        <form
          className='ModalChangeVisitMR__Form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputForm
            className='mb-10'
            value={`${user.roles[0].name} ${user?.name}`}
            onChange={() => {}}
            placeholder=''
            label='Занимаемая должность'
            disabled
          />
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
            rules={typeAction !== 'accept' ? fullNameValidation : undefined}
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
          <div className='mt-20 flex justify-space-around items-center gap-x-10'>
            {monitoredVisit.approval === 'not_processed' && (
              <Button
                type={'submit'}
                onClick={() => setTypeAction('accept')}
                className='CustomButton Accept'
              >
                В работу
              </Button>
            )}
            {monitoredVisit.approval === 'accepted' && (
              <Button
                type={'submit'}
                onClick={() => setTypeAction('save')}
                className='CustomButton'
              >
                Сохранить
              </Button>
            )}
            {monitoredVisit.approval === 'accepted' && (
              <Button
                type={'submit'}
                onClick={() => setTypeAction('cancel')}
                className='CustomButton Decline'
              >
                Отменить
              </Button>
            )}
            {monitoredVisit.approval === 'not_processed' && (
              <Button
                type={'submit'}
                onClick={() => setTypeAction('decline')}
                className='CustomButton Decline'
              >
                Отклонить
              </Button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};
