import React, { useMemo } from 'react';
import { Button, Modal } from 'ui-kit';
import { ICalendarEvents } from 'pages/CalendarPage/CalendarPage';
import dayjs from 'dayjs';
import './Popup.scss';
import { useNavigate } from 'react-router-dom';
import { DateFormats, ROUTES } from 'enums';
import { useCalendarStore } from 'pages/CalendarPage/useCalendarStore';
import { useEventsStore } from 'store/useEventsStore';
import { useVisitsStore } from 'store/useVisitsStore';
import { useModalsStore } from 'store/useModalsStore';

interface IPopupProps {
  visibility: boolean;
  changeVisibility: (visibility: boolean) => void;
  event: ICalendarEvents | undefined;
}

export const eventsTitleData = [
  'Видеоконференция',
  'Круглый стол',
  'Онлайн-ординаторская',
];
export const visitsTitleData = [
  'Дистанционный визит',
  'Визит в аптеку',
  'Визит к врачу',
];

export const Popup = ({ visibility, changeVisibility, event }: IPopupProps) => {
  const navigate = useNavigate();

  const removeMarkedDate = useCalendarStore((state) => state.removeMarkedDate);
  // const removeEvent = useEventsStore((state) => state.removeEvent);
  // const removeVisit = useVisitsStore((state) => state.removeVisit);
  // const handleChangeVisitId = useModalsStore(
  //   (state) => state.handleChangeVisitId
  // );
  const showModalChange = useModalsStore((state) => state.handleChangeVisit);
  const showModal = useModalsStore((state) => state.handlePeople);
  const transferIdModal = useModalsStore((state) => state.handlePeopleId);

  const eventStart = dayjs(event?.start).format(
    DateFormats.DATE_FORMAT_FOR_COMPARE
  );
  const eventEnd = dayjs(event?.end).format(
    DateFormats.DATE_FORMAT_FOR_COMPARE
  );

  const visitStart = dayjs(event?.start).format(DateFormats.VISIT_DATE_FORMAT);
  const visitEnd = dayjs(event?.end).format(DateFormats.VISIT_DATE_FORMAT);

  const eventTimeStart = dayjs(event?.start).format(DateFormats.TIME_FORMAT);

  const typeEvent = useMemo(() => {
    if (event && visitsTitleData.includes(event?.title)) {
      return 'визит';
    } else return 'мероприятие';
  }, [event?.title]);

  const checkTypeEvent = useMemo(() => {
    return (
      (event && visitsTitleData.includes(event?.title)) ||
      (event && eventsTitleData.includes(event?.title))
    );
  }, [event]);

  const checkTypeAdminActivity = useMemo(() => {
    return event?.title === 'Тренинг' && eventStart === eventEnd;
  }, [event]);

  const onClickOpen = () => {
    if (event && visitsTitleData.includes(event?.title)) {
      return navigate(ROUTES.VISITS);
    } else navigate(ROUTES.EVENTS);
  };

  const onClickRemove = () => {
    if (event && visitsTitleData.includes(event?.title)) {
      // removeVisit(event?.id);
    } else if (event && eventsTitleData.includes(event?.title)) {
      // removeEvent(event?.id);
    } else event && removeMarkedDate(event?.id);
    changeVisibility(false);
  };

  const onClickEdit = () => {
    if (event && visitsTitleData.includes(event?.title)) {
      navigate(ROUTES.VISITS);
      // handleChangeVisitId(event?.id);
      showModalChange(true);
    } else {
      navigate(`${ROUTES.EVENT_INFO}/${event?.title}/${event?.id}`);
      event && transferIdModal(event.id);
      showModal(true);
    }
    changeVisibility(false);
  };

  return (
    <Modal visibility={visibility} changeVisibility={changeVisibility}>
      <div className={'Popup'}>
        <h4 className={'Popup__Title'}>{event?.title}</h4>
        {checkTypeEvent ? (
          <>
            <div className={'Popup__Date'}>
              {visitStart}
              <label>{eventTimeStart}</label>
            </div>
            <div className={'Popup__BtnGroup'}>
              <Button
                className={'Popup__BtnGroup_Button'}
                onClick={onClickEdit}
              >
                Перепланировать {typeEvent}
              </Button>
              <Button
                className={'Popup__BtnGroup_Button'}
                onClick={onClickOpen}
              >
                Открыть {typeEvent}
              </Button>
              <Button
                className={'Popup__BtnGroup_Button'}
                onClick={onClickRemove}
              >
                Удалить {typeEvent}
              </Button>
            </div>
          </>
        ) : (
          <>
            {checkTypeAdminActivity ? (
              <div className={'Popup__Date'}>
                {visitStart}
                <label>{eventTimeStart}</label>
              </div>
            ) : (
              <div className={'Popup__Activity'}>
                {`${visitStart} - ${visitEnd}`}
              </div>
            )}

            <div className={'Popup__BtnGroup'}>
              <Button
                className={'Popup__BtnGroup_Button'}
                onClick={onClickRemove}
              >
                Удалить
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
