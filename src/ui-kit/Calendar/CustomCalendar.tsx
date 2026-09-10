import React, { FC, useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.scss';

export const CustomCalendar: FC = () => {
  const [value, onChange] = useState<Date>(new Date());

  return (
    <div className='Calendar'>
      <Calendar
        className='react-calendar'
        // onChange={onChange}
        value={value}
        defaultView='month'
        minDetail='year'
        prev2Label={null}
        next2Label={null}
      />
    </div>
  );
};
