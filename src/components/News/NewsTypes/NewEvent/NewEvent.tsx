import React from 'react';

import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { DateFormats, ROUTES } from 'enums';
import { Icon } from 'ui-kit';

import './NewEvent.scss';
import { useEventsStore } from 'store/useEventsStore';

interface INewEvent {
  eventId: string;
}

export const NewEvent = ({ eventId }: INewEvent) => {
  const navigate = useNavigate();
  const event = useEventsStore((state) =>
    // @ts-ignore
    state.events.find(({ id }) => id === eventId)
  );

  return (
    <div className='NewEvent' onClick={() => navigate(ROUTES.EVENTS)}>
      <div className='Info'>
        {/*<div className='Info__Icon'>*/}
        {/*  <Icon type='AddSquare' />*/}
        {/*</div>*/}
        <div className='Info__Type'>
          <h4 className='TypeName'>Мероприятие</h4>
          <span className='Date'>
            {
              // @ts-ignore
              dayjs(event?.date).format(DateFormats.APP_DATE_FORMAT)
            }
          </span>
        </div>
      </div>
      <div className='TimeWrapper'>
        <p className='Time'>
          {
            // @ts-ignore
            dayjs(event?.creationDate).locale('ru').fromNow()
          }
        </p>
      </div>
    </div>
  );
};
