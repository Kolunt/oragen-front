import React from 'react';
import { ICalendarEvents } from '../../CalendarPage';
import dayjs from 'dayjs';
import { DateFormats } from '../../../../enums';
import '../Sidebar.scss';

export const ListTasks = ({ list }: any) => {
  return (
    <>
      {list.map(({ id, title, start, color, background }: ICalendarEvents) => (
        <ul key={id} className='Sidebar__Content'>
          <li
            style={{ color: `${background ? background : color}` }}
            className='Sidebar__Content_Title'
          >
            {title}
          </li>
          <div className='Sidebar__Content_Time'>
            {dayjs(start).format(DateFormats.TIME_FORMAT)}
          </div>
        </ul>
      ))}
    </>
  );
};
