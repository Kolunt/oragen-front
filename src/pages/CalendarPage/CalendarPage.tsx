import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import moment from 'moment';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';
import { Layout } from 'components/Layout/Layout';
import { Popup, Sidebar, YearView } from 'pages/CalendarPage';
import { useCalendarStore } from 'pages/CalendarPage/useCalendarStore';
import { Button, ISelectOption } from 'ui-kit';

import 'moment/locale/ru';
import { IEvent } from 'store/useEventsStore';
import { eventsTitleData, visitsTitleData } from './Popup/Popup';
import { DateFormats } from 'enums';
import { ITask } from 'store/useTasksStore';
import { IVisit } from 'api/visitsApi';
import { useUserStore } from 'store/useUserStore';
import { getEventFromType } from 'utils';
import './CalendarPage.scss';
import { ScrollBar } from '../../ui-kit/ScrollBar/ScrollBar';

const calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar);

export const months: ISelectOption[] = [
  { value: '0', label: 'январь' },
  { value: '1', label: 'февраль' },
  { value: '2', label: 'март' },
  { value: '3', label: 'апрель' },
  { value: '4', label: 'май' },
  { value: '5', label: 'июнь' },
  { value: '6', label: 'июль' },
  { value: '7', label: 'август' },
  { value: '8', label: 'сентябрь' },
  { value: '9', label: 'октябрь' },
  { value: '10', label: 'ноябрь' },
  { value: '11', label: 'декабрь' },
];

const monthsName = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'октябрь',
  'Ноябрь',
  'Декабрь',
];

export interface ICalendarEvents {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  background?: string;
  start_readable?: string;
  end_readable?: string;
}

export const CalendarPage = () => {
  const markedDates = useCalendarStore((state) => state.markedDates);
  const calendarVisits = useCalendarStore((state) => state.calendarVisits);
  const getCalendarVisits = useCalendarStore(
    (state) => state.getCalendarVisits
  );
  const eventsCalendar = useCalendarStore((state) => state.eventsCalendar);
  const getCalendarEvents = useCalendarStore(
    (state) => state.getCalendarEvents
  );
  const calendarTasks = useCalendarStore((state) => state.calendarTasks);
  const getCalendarTasks = useCalendarStore((state) => state.getCalendarTasks);
  const me = useUserStore((state) => state.me);
  const isMedRep = me.roles[0].id === 8;

  const [view, setView] = useState<View>(Views.MONTH);
  const [yearView, setYearView] = useState(false);
  const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<ICalendarEvents>();

  const localizer = momentLocalizer(moment);

  const now = new Date();

  useEffect(() => {
    getCalendarEvents();
    getCalendarTasks();
    if (isMedRep) {
      getCalendarVisits(me.id);
    } else {
      getCalendarVisits();
    }
  }, []);

  const onView = useCallback((newView: View) => setView(newView), [setView]);
  const filteredVisits = calendarVisits.filter(
    (item) => item.approval === 'accepted'
  );

  const events = filteredVisits
    .map(({ id, planned_at, mode }: IVisit) => ({
      id: `${id}`,
      title: mode === 'local' ? 'Визит к врачу' : 'Дистанционный визит',
      start: dayjs(planned_at).toDate(),
      end: dayjs(planned_at).toDate(),
      color: mode === 'local' ? '#4bb44b' : '#ed6747',
    }))
    .concat(
      markedDates.map(({ id, title, start, end, color }: ICalendarEvents) => ({
        id: id,
        title: title,
        start: dayjs(start).toDate(),
        end: dayjs(end).toDate(),
        color: '#fff',
        background: color,
      }))
    )
    .concat(
      eventsCalendar.map(({ id, started_at, finished_at, type }: IEvent) => ({
        id: `${id}`,
        title: getEventFromType(type).title,
        start: dayjs(started_at).toDate(),
        end: dayjs(finished_at).toDate(),
        color: getEventFromType(type).color,
      }))
    )
    .concat(
      calendarTasks.map(({ id, started_at, finished_at, name }: ITask) => ({
        id: `${id}`,
        title: name,
        start: dayjs(started_at).toDate(),
        end: dayjs(finished_at).toDate(),
        color: '#15120f',
        background: '#DEB373',
      }))
    );

  const MyToolbar = memo(() => {
    return <div></div>;
  });

  const { messages, components } = useMemo(
    () => ({
      messages: { showMore: (total: number) => `${total} ещё` },
      components: { toolbar: MyToolbar },
    }),
    []
  );

  /*const messages = {
    allDay: 'Полный день',
    previous: 'Предидущий',
    next: 'Следующий',
    today: 'Сейчас',
    month: 'Месяц',
    week: 'Неделя',
    day: 'День',
    agenda: 'Повестка дня',
    date: 'Дата',
    time: 'Время',
    event: 'Событие',
  };*/

  const eventPropGetter = useCallback(
    (event: ICalendarEvents) => ({
      style: {
        color: `${event.color}`,
        backgroundColor: `${event.background}`,
      },
    }),
    []
  );
  const slotGroupPropGetter = useCallback(
    () => ({
      style: { minHeight: '92px' },
    }),
    []
  );

  const titleAccessor = useCallback((e: ICalendarEvents) => {
    if (
      visitsTitleData.includes(e?.title) ||
      eventsTitleData.includes(e?.title)
    ) {
      return `${dayjs(e.start).format(DateFormats.TIME_FORMAT)} ${e.title}`;
    } else return `${e.title}`;
  }, []);

  const handleSelectEvent = useCallback((event: ICalendarEvents) => {
    // setIsShowPopup(true);
    // setPopupData(event);
  }, []);

  const clickMonth = useCallback(() => {
    setView(Views.MONTH);
    setYearView(false);
  }, [view, yearView]);

  const clickWeek = useCallback(() => {
    setView(Views.WEEK);
    setYearView(false);
  }, [view, yearView]);

  const clickYear = useCallback(() => {
    setYearView(true);
  }, [yearView]);

  const newEvents = useMemo(() => {
    const cloneEvents = [];
    for (let i = 0; i < events.length; i++) {
      cloneEvents.push({
        ...events[i],
        start_readable: dayjs(events[i].start).format(DateFormats.DATE_FORMAT),
        end_readable: dayjs(events[i].end).format(DateFormats.DATE_FORMAT),
      });
    }
    return cloneEvents.reduce((acc: any = [], item) => {
      const { start, end, start_readable, end_readable, id } = item;
      if (start_readable !== end_readable) {
        let diffInDays = dayjs(end).diff(start, 'day');
        // console.log(diffInDays, start_readable, end_readable)
        if (diffInDays >= 0) {
          // добавляем первый день периода
          acc.push({
            ...item,
            start: start,
          });
          // добавляем дни в период
          let i = 0;
          while (i < diffInDays) {
            i++;
            acc.push({
              ...item,
              id: id + i,
              start: dayjs(start).add(i, 'day'),
            });
          }

          // если diffInDays равен 0, 1, 2
          // то добавляем последний день периода
          if (diffInDays >= 0 && diffInDays <= 2) {
            acc.push({
              ...item,
              start: end,
            });
          }
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
  }, [events]);

  return (
    <div className='CalendarPage'>
      <Layout>
        <div className='CalendarPage__Box'>
          <Sidebar events={newEvents} />
          {!yearView ? (
            <div className='CalendarPage__Box_Content hidden relative flex-container'>
              <div className='CalendarPage__Toolbar'>
                <div className='CalendarPage__Toolbar-Block'>
                  <h2 className='CalendarPage__Toolbar-Title'>
                    {monthsName[now.getMonth()]} {now.getFullYear()}
                  </h2>
                  <div className='CalendarPage__Toolbar_Box'>
                    <Button
                      className={`${yearView ? 'gold' : 'gray'} btn medium`}
                      onClick={clickYear}
                    >
                      Год
                    </Button>
                    <Button
                      className={`${
                        view === 'month' && !yearView ? 'gold' : 'gray'
                      } btn medium`}
                      onClick={clickMonth}
                    >
                      Месяц
                    </Button>
                    <Button
                      className={`${
                        view === 'week' && !yearView ? 'gold' : 'gray'
                      } btn medium`}
                      onClick={clickWeek}
                    >
                      Неделя
                    </Button>
                  </div>
                </div>
              </div>
              <ScrollBar>
                <Calendar
                  localizer={localizer}
                  events={events}
                  defaultView='month'
                  className='CalendarPage__Box_Content_Calendar'
                  view={view}
                  onView={onView}
                  components={components}
                  eventPropGetter={eventPropGetter}
                  slotGroupPropGetter={slotGroupPropGetter}
                  timeslots={1}
                  min={new Date(1972, 0, 1, 7)}
                  max={new Date(new Date().getFullYear(), 0, 1, 21)}
                  titleAccessor={titleAccessor}
                  views={{ month: true, week: true }}
                  popup
                  messages={messages}
                  step={60}
                  tooltipAccessor={() => ''}
                  onSelectEvent={handleSelectEvent}
                />
              </ScrollBar>
            </div>
          ) : (
            <div className='YearViewWrapper'>
              <div className='CalendarPage__Toolbar'>
                <div className='CalendarPage__Toolbar-Block'>
                  <h2 className='CalendarPage__Toolbar-Title'>
                    {monthsName[now.getMonth()]} {now.getFullYear()}
                  </h2>
                  <div className='CalendarPage__Toolbar_Box'>
                    <Button
                      className={`${yearView ? 'gold' : 'gray'} btn medium`}
                      onClick={clickYear}
                    >
                      Год
                    </Button>
                    <Button
                      className={`${
                        view === 'month' && !yearView ? 'gold' : 'gray'
                      } btn medium`}
                      onClick={clickMonth}
                    >
                      Месяц
                    </Button>
                    <Button
                      className={`${
                        view === 'week' && !yearView ? 'gold' : 'gray'
                      } btn medium`}
                      onClick={clickWeek}
                    >
                      Неделя
                    </Button>
                  </div>
                </div>
              </div>
              <ScrollBar>
                <div className='CalendarPage__Box_YearView'>
                  {months.map((month, index) => (
                    <YearView
                      month={month.value}
                      key={month.value + index}
                      events={newEvents}
                    />
                  ))}
                </div>
              </ScrollBar>
            </div>
          )}
        </div>
        <Popup
          visibility={isShowPopup}
          changeVisibility={setIsShowPopup}
          event={popupData}
        />
      </Layout>
    </div>
  );
};
