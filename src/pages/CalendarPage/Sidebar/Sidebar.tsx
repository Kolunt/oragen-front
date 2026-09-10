import React, { FC } from 'react';
import dayjs from 'dayjs';
import calendar from 'assets/svg/calendarPage/Calendar.svg';
import { DateFormats } from 'enums';
import { ListTasks } from './Components/ListTasks';
import { ICalendarEvents } from 'pages/CalendarPage/CalendarPage';
import './Sidebar.scss';
import { ScrollBar } from '../../../ui-kit/ScrollBar/ScrollBar';

interface ICalendarSidebar {
  events: ICalendarEvents[];
}

export const Sidebar: FC<ICalendarSidebar> = (props) => {
  const { events } = props;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayFormat = dayjs(new Date()).format(DateFormats.APP_DATE_FORMAT);
  const tomorrowFormat = dayjs(tomorrow).format(DateFormats.APP_DATE_FORMAT);

  const todayTasks = events
    .filter(
      ({ start }) =>
        dayjs(start).format(DateFormats.APP_DATE_FORMAT) === todayFormat
    )
    .sort((a, b) => (a.start > b.start ? 1 : -1));

  const tomorrowTasks = events
    .filter(
      ({ start }) =>
        dayjs(start).format(DateFormats.APP_DATE_FORMAT) === tomorrowFormat
    )
    .sort((a, b) => (a.start > b.start ? 1 : -1));

  return (
    <div className='relative'>
      <ScrollBar>
        <div className='Sidebar h-full'>
          <div className='mb-15'>
            <div className='Sidebar__Title flex justify-space-between'>
              <div className='flex'>
                <img src={calendar} alt='calendar-icon' />
                <h5 className='pl-5'>Сегодня</h5>
              </div>
              {todayFormat}
            </div>
            <ListTasks list={todayTasks} />
          </div>
          <div className='mb-15'>
            <div className='Sidebar__Title flex justify-space-between'>
              <div className='flex'>
                <img src={calendar} alt='calendar-icon' />
                <h5 className='pl-5'>Завтра</h5>
              </div>
              {tomorrowFormat}
            </div>
            <ListTasks list={tomorrowTasks} />
          </div>
        </div>
      </ScrollBar>
    </div>
  );
};
