import React, { useState, KeyboardEvent, useEffect } from 'react';
import { IVisitCountPayload, useModalsStore } from 'store/useModalsStore';
import { Button, InputForm, Modal } from 'ui-kit';
import { useTargetsLocalStore } from 'store/useTargetsLocalStore';
import './ModalChangeVisitsCount.scss';

export const ModalChangeVisitsCount = () => {
  const isShowModal = useModalsStore((state) => state.isVisitsCount);
  const changeShowModal = useModalsStore((state) => state.handleVisitsCount);
  const changeContactVisitsCount = useTargetsLocalStore(
    (state) => state.changeContactVisitsCount
  );
  const changeOrganizationVisitsCount = useTargetsLocalStore(
    (state) => state.changeOrganizationVisitsCount
  );
  const changeVisitsCount = useTargetsLocalStore(
    (state) => state.changeVisitsCount
  );
  const handleVisitsCountPayload = useModalsStore(
    (state) => state.handleVisitsCountPayload
  );
  const data = useModalsStore((state) => state.isVisitsCountPayload);
  const [visits, setVisits] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isShowModal) {
      if (isInDesiredForm(visits)) {
        setError('');
      } else {
        setError('Не корректное число!');
      }
    }
  }, [visits, isShowModal]);

  useEffect(() => {
    if (isShowModal) {
      setVisits(`${data.currentValue}`);
    }
  }, [isShowModal, data.currentValue]);

  const onChangeVisits = () => {
    if (!error.length) {
      if (
        data.type === 'matchedContact' &&
        data.contactId &&
        data.contactType
      ) {
        if (data.contactType === 'contact') {
          changeContactVisitsCount(data.targetListId, +data.contactId, +visits);
        }
        if (data.contactType === 'organization') {
          changeOrganizationVisitsCount(
            data.targetListId,
            +data.contactId,
            +visits
          );
        }
      }

      if (data.type === 'local') {
        changeVisitsCount(data.targetListId, +visits);
      }
      handleVisitsCountPayload({} as IVisitCountPayload);
      onCancel();
    }
  };

  const onKeyDownVisits = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      onCancel();
    }
    if (e.key === 'Enter') {
      onChangeVisits();
      onCancel();
    }
  };

  const onCancel = () => {
    setVisits('');
    changeShowModal(false);
  };

  function isInDesiredForm(str: string) {
    const n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
  }

  /*  let error =
    data.maxVisits && data.maxVisits + data.currentValue < +visits
      ? 'Визитов больше чем запланировано!'
      : '';*/

  /*  const visitsRemain = data.maxVisits
    ? data.maxVisits > 0
      ? data.maxVisits + data.currentValue
      : data.maxVisits
    : 0;*/

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalChangeVisitsCount'>
        <h3 className='ModalChangeVisitsCount__Title'>
          Изменить количество визитов
        </h3>
        {/*        {data.type === 'matchedContact' && (
          <p className='ModalChangeVisitsCount__SubTitle'>
            Осталось визитов: {visitsRemain}
          </p>
        )}*/}
        <InputForm
          type='number'
          autoFocus={true}
          value={visits}
          min={0}
          max={data.maxVisits}
          onChange={(e) => setVisits(e.currentTarget.value)}
          onKeyDown={onKeyDownVisits}
          error={error}
        />
        <div className='mt-20 flex justify-space-between gap-x-20'>
          <Button onClick={onChangeVisits}>Изменить</Button>
          <Button className='btn cancel' onClick={onCancel}>
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  );
};
