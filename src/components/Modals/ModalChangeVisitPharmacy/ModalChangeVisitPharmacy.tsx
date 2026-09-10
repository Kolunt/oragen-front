import React, { useEffect } from 'react';
import { Button, InputForm, ISelectOption, Modal, SelectForm } from 'ui-kit';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { fullNameValidation } from 'validation/validation';
import { useModalsStore } from 'store/useModalsStore';
import { useUserStore } from 'store/useUserStore';
import { IUpdateVisitPerformerPayload } from 'api/visitsApi';
import { useSelectOptions } from 'hooks';
import { useVisitsPharmacyStore } from 'store/useVisitsPharmacyStore';

interface IVisitFormDirector {
  performer: ISelectOption;
}

export const ModalChangeVisitPharmacy = () => {
  const isShowModal = useModalsStore((state) => state.isChangeVisitPharmacy);
  const changeShowModal = useModalsStore(
    (state) => state.handleChangeVisitPharmacy
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
  const user = useUserStore((state) => state.me);
  const users = useUserStore((state) => state.roleUsers);
  const getRoleUsers = useUserStore((state) => state.getRoleUsers);
  const updateVisitPerformer = useVisitsPharmacyStore(
    (state) => state.updateVisitPerformer
  );

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IVisitFormDirector>({
    defaultValues: {
      performer: undefined,
    },
  });

  useEffect(() => {
    if (isShowModal && monitoredVisitId) {
      getMonitoredVisit(monitoredVisitId);
      getRoleUsers(8);
    }
  }, [monitoredVisitId, isShowModal]);

  useEffect(() => {
    if (isShowModal && 'performer' in monitoredVisit) {
      setValue('performer', {
        value: `${monitoredVisit.performer.id}`,
        label: monitoredVisit.performer.name,
      });
    }
  }, [monitoredVisit, isShowModal]);

  const onSubmit: SubmitHandler<IVisitFormDirector> = (data) => {
    const payload: IUpdateVisitPerformerPayload = {
      id: monitoredVisit.id,
      performerId: +data.performer.value,
    };
    updateVisitPerformer(payload);
    reset();
  };

  const performersList = useSelectOptions(users, 'id', 'name');

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalAddVisit'>
        <h3 className='ModalAddVisit__Header'>Изменить визит</h3>

        <form className='ModalAddVisit__Form' onSubmit={handleSubmit(onSubmit)}>
          <InputForm
            value={user.roles[0].name}
            onChange={() => {}}
            placeholder=''
            label='Занимаемая должность'
            disabled
          />
          <Controller
            control={control}
            name='performer'
            rules={fullNameValidation}
            render={({ field }) => (
              <SelectForm
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={performersList}
                label='Исполнитель'
                error={errors.performer && errors.performer.message}
              />
            )}
          />
          <div className='ModalAddVisit__ButtonGroup'>
            <Button
              className='ButtonCancel'
              onClick={() => changeShowModal(false)}
            >
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
