import React, { useEffect, useMemo } from 'react';
import { Title } from 'ui-kit';
import dayjs from 'dayjs';
import { DateFormats } from 'enums';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import { IVisit } from 'api/visitsApi';
import { IEvent } from 'store/useEventsStore';
import { getEventFromType } from 'utils';
import { ITask } from 'store/useTasksStore';
import { ICalendarEvents } from '../../../CalendarPage';
import { useUpcomingUserEvents } from '../../useUpcomingUserEvents';
import { useCalendarStore } from '../../../CalendarPage/useCalendarStore';
import { useUserStore } from 'store/useUserStore';
import { v1 } from 'uuid';

let days = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];

let nameDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

export const UpcomingUserEvents = () => {
  const markedDates = useCalendarStore((state) => state.markedDates);
  const tasksForNextDays = useUpcomingUserEvents(
    (state) => state.tasksForNextDays
  );
  const getTasksForNextDays = useUpcomingUserEvents(
    (state) => state.getTasksForNextDays
  );
  const eventsForNextDays = useUpcomingUserEvents(
    (state) => state.eventsForNextDays
  );
  const getEventsForNextDays = useUpcomingUserEvents(
    (state) => state.getEventsForNextDays
  );
  const visitsForNextDays = useUpcomingUserEvents(
    (state) => state.visitsForNextDays
  );
  const getVisitsForNextDays = useUpcomingUserEvents(
    (state) => state.getVisitsForNextDays
  );

  const me = useUserStore((state) => state.me);
  const isMedRep = me.roles[0].id === 8;

  const now = dayjs(new Date().setHours(7, 0, 0, 0));
  /*    const dayAfterTomorrow = dayjs(now).add(
        dayjs.duration({ days: 2, hours: 15 })
    );*/
  const dayAfterTomorrow = dayjs(now).add(2, 'day').add(15, 'hours');

  useEffect(() => {
    getTasksForNextDays(now.toISOString(), dayAfterTomorrow.toISOString());
    getEventsForNextDays(now.toISOString(), dayAfterTomorrow.toISOString());
    if (isMedRep) {
      getVisitsForNextDays(
        me.id,
        now.toISOString(),
        dayAfterTomorrow.toISOString()
      );
    } else {
      getVisitsForNextDays(
        0,
        now.toISOString(),
        dayAfterTomorrow.toISOString()
      );
    }
  }, []);

  const filteredVisits = visitsForNextDays.filter(
    (item) => item.approval === 'accepted'
  );

  const events = useMemo(() => {
    const fullEvents = filteredVisits
      .map(({ id, planned_at, mode }: IVisit) => ({
        id: `${id}`,
        title: mode === 'local' ? 'Встреча с врачом' : 'Дистанционный визит',
        start: dayjs(planned_at).toDate(),
        type: 'visit',
      }))
      .concat(
        eventsForNextDays.map(
          ({ id, started_at, finished_at, type, name }: IEvent) => ({
            id: `${id}`,
            title: getEventFromType(type).title,
            name: name,
            start: dayjs(started_at).toDate(),
            end: dayjs(finished_at).toDate(),
            type: 'events',
          })
        )
      )
      .concat(
        tasksForNextDays.map(
          ({ id, started_at, finished_at, name }: ITask) => ({
            id: `${id}`,
            title: 'Задача',
            name: name,
            start: dayjs(started_at).toDate(),
            end: dayjs(finished_at).toDate(),
            type: 'task',
          })
        )
      )
      .concat(
        markedDates.map(({ id, title, start, end }: ICalendarEvents) => ({
          id: id,
          title: title,
          start: dayjs(start).toDate(),
          end: dayjs(end).toDate(),
          type: 'markedDates',
        }))
      );
    return fullEvents.sort((a, b) => (a.start > b.start ? 1 : -1));
  }, [filteredVisits, tasksForNextDays, visitsForNextDays]);

  return (
    <div>
      <div className='flex mb-10'>
        <Title>Сегодня</Title>
        <div className='ml-5 fz-16 mr-20 flex flex-column justify-space-around items-center'>
          <div className='flex'>
            {/*<img src={calendar} alt='calendar-icon mr-3' />*/}
            <span className='mr-5'>{days[new Date().getDay()]}</span>
            <span className='mr-5'>
              {dayjs(new Date()).format(DateFormats.APP_DATE_FORMAT)}
            </span>
          </div>
        </div>
      </div>
      <Title className='mb-15'>Ваши ближайшие события:</Title>
      <div
        className='bg-background-l8 br-10 p-20 relative'
        style={{ height: 'calc(100vh - 270px)', minWidth: '450px' }}
      >
        <ScrollBar>
          {
            // @ts-ignore
            events.map(({ id, title, start, end, type, name }) => (
              <div className='bg-white-l1 br-6 p-10 mb-10 flex' key={v1()}>
                <div className='mr-5 fw-700 pr-5'>
                  {type === 'visit' ? (
                    <>{dayjs(start).format(DateFormats.TASK_DATE_FORMAT)}</>
                  ) : (
                    <>
                      <div className='text-right'>
                        <span className='color-tertiary-l3'>с </span>
                        {dayjs(start).format(DateFormats.TASK_DATE_FORMAT)}
                      </div>
                      <div>
                        <span className='color-tertiary-l3'>по </span>
                        {dayjs(end).format(DateFormats.TASK_DATE_FORMAT)}
                      </div>
                    </>
                  )}
                </div>
                <div className='mr-5 border-grey-left pl-10'>
                  <div className='fw-600'>{title}</div>
                  <div>{name}</div>
                </div>
                {/*({type})*/}
              </div>
            ))
          }
        </ScrollBar>
      </div>
    </div>
  );
};
