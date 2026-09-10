import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { EventTypeCalendar, IEvent } from 'store/useEventsStore';
import { VisitType } from 'store/useVisitsStore';
import { getEventFromType } from 'utils/getEventFromType';
import { AdminActivityTypes } from 'enums';
import { fetchVisits, IFetchVisitsRequest, IVisit } from 'api/visitsApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { fetchEvents } from 'api/eventsApi';
import { ITask } from 'store/useTasksStore';
import { fetchTasks, IGetTask } from 'api/tasksApi';

export type AdminActivityType =
  | AdminActivityTypes.HOLIDAY
  | AdminActivityTypes.HOSPITAL
  | AdminActivityTypes.TRAINING;

export type CalendarType = VisitType & EventTypeCalendar & AdminActivityType;

interface INewDateCalendar {
  id: string;
  type: CalendarType;
  startDate: Date;
  endDate: Date;
}

interface ICalendar {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

interface ICalendarStore {
  markedDates: ICalendar[];
  addMarkedDate: (data: INewDateCalendar) => void;
  removeMarkedDate: (id: string) => void;
  calendarVisits: IVisit[];
  getCalendarVisits: (id?: number) => void;
  eventsCalendar: IEvent[];
  getCalendarEvents: () => void;
  calendarTasks: ITask[];
  getCalendarTasks: () => void;
}

export const useCalendarStore = create<ICalendarStore>()(
  persist(
    immer((set) => ({
      markedDates: [],
      calendarVisits: [],
      eventsCalendar: [],
      calendarTasks: [],
      addMarkedDate: (data) =>
        set((state) => {
          const newDate = {
            id: data.id,
            title: getEventFromType(data.type).title,
            start: data.startDate,
            end: data.endDate,
            color: getEventFromType(data.type).color,
          };

          state.markedDates.push(newDate);
        }),
      removeMarkedDate: (id) =>
        set((state) => {
          state.markedDates = state.markedDates.filter(
            (item) => item.id !== id
          );
        }),
      getCalendarVisits: async (id) => {
        useAuthStore.getState().setLoading(true);
        const payload = {
          paginationMethod: 'full',
          page: 1,
          pageSize: 20,
        };

        const params = {
          performer_id: id,
        };

        try {
          const { data } = await fetchVisits(
            payload,
            params as IFetchVisitsRequest
          );
          if (data) {
            set({
              calendarVisits: data.data,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      getCalendarEvents: async () => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchEvents();
          if (data) {
            set({ eventsCalendar: data.data });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      getCalendarTasks: async () => {
        useAuthStore.getState().setLoading(true);

        const payload = {
          paginationMethod: 'full',
          page: 1,
          pageSize: 20,
        };

        const params: IGetTask = {
          mode: 'performed',
          showSubTasks: false,
        };

        try {
          const { data } = await fetchTasks(payload, params);
          if (data) {
            set({
              calendarTasks: data.data,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
    })),
    { name: 'calendar' }
  )
);
