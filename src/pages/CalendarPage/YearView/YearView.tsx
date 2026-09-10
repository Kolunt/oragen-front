import React, { useState } from 'react';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import './YearView.scss';
import { ICalendarEvents } from '../CalendarPage';
import { DateFormats } from 'enums';
import { Icon } from 'ui-kit';

interface IYearViewProps {
  month: string;
  events: ICalendarEvents[];
}

export const YearView = ({ month, events }: IYearViewProps) => {
  const [, setDateState] = useState(new Date());
  const [visibility, setVisibility] = useState(false);
  const [event, setEvent] = useState<ICalendarEvents[]>();
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);

  const mapEvents = new Map();

  const changeDate = (e: Date, event: React.SyntheticEvent) => {
    const nativeEvent = event.nativeEvent as typeof event.nativeEvent & {
      clientY: number;
      clientX: number;
    };
    setDateState(e);
    if (mapEvents.get(dayjs(e).format(DateFormats.DATE_FORMAT))) {
      setEvent(
        events.filter(
          (item) =>
            dayjs(item.start).format(DateFormats.DATE_FORMAT) ===
            dayjs(e).format(DateFormats.DATE_FORMAT)
        )
      );
      setVisibility(true);
      setOffsetTop(nativeEvent.clientY);
      setOffsetLeft(nativeEvent.clientX);
    } else {
      setEvent([]);
      setVisibility(false);
    }
  };

  const eventsToMap = () => {
    events.forEach((item, index) => {
      mapEvents.set(dayjs(item.start).format(DateFormats.DATE_FORMAT), [item]);
    });
  };

  eventsToMap();
  return (
    <div className='YearView'>
      <Calendar
        className={`${
          new Date().getMonth() !== Number(month) ? 'notToMonth' : ''
        } react-calendar`}
        prev2Label={null}
        next2Label={null}
        prevLabel={null}
        nextLabel={null}
        value={dayjs(
          new Date(new Date().getFullYear(), +month, new Date().getDate())
        ).toDate()}
        maxDetail={'month'}
        // @ts-ignore
        tileClassName={({ date, view }) => {
          if (date.getDay() === 0 || date.getDay() === 6) {
            return 'wednesday';
          }
          if (mapEvents.get(dayjs(date).format(DateFormats.DATE_FORMAT))) {
            return 'event';
          }
        }}
        // @ts-ignore
        onChange={changeDate}
        showNeighboringMonth={false}
      />

      {visibility && (
        <div
          className='fixed bg-white-l1 br-10 pr-15 pb-15 pl-15 pt-10 box-shadow'
          style={{ left: offsetLeft, top: offsetTop }}
        >
          <Icon
            size='small'
            type='Close'
            className='ml-auto block mb-5'
            onClick={() => setVisibility(false)}
          />
          {event?.map(({ title, start, id, color, background }) => (
            <div className='flex' key={id}>
              <div
                className='pr-5'
                style={{ color: `${background ? background : color}` }}
              >
                {title} -{' '}
              </div>
              <div>{dayjs(start).format(DateFormats.TASK_DATE_FORMAT)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
