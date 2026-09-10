import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { fetchEvents, fetchVisits } from 'api';
import { IFetchVisitsRequest, IVisit } from 'api/visitsApi';
import { ITask } from 'store/useTasksStore';
import { fetchTasks, IGetTask } from 'api/tasksApi';
import { IEvent } from 'store/useEventsStore';
import { IGetEvent } from 'api/eventsApi';

interface IUseUpcomingUserEvents {
  tasksForNextDays: ITask[];
  getTasksForNextDays: (start: string, end: string) => void;
  getEventsForNextDays: (start: string, end: string) => void;
  eventsForNextDays: IEvent[];
  getVisitsForNextDays: (id?: number, start?: string, end?: string) => void;
  visitsForNextDays: IVisit[];
}

export const useUpcomingUserEvents = create<IUseUpcomingUserEvents>()(
  immer((set, get) => ({
    tasksForNextDays: [],
    eventsForNextDays: [],
    visitsForNextDays: [],
    getTasksForNextDays: async (start, end) => {
      const payload = {
        paginationMethod: 'full',
        page: 1,
        pageSize: 20,
      };

      const params: IGetTask = {
        mode: 'performed',
        showSubTasks: false,
        started_after: start,
        started_before: end,
      };
      try {
        const { data } = await fetchTasks(payload, params);
        if (data) {
          set({
            tasksForNextDays: data.data,
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    getEventsForNextDays: async (start, end) => {
      const payload = {
        paginationMethod: 'full',
        page: 1,
        pageSize: 20,
      };
      const params: IGetEvent = {
        started_after: start,
        started_before: end,
      };
      try {
        const { data } = await fetchEvents(payload, params);
        if (data) {
          set({ eventsForNextDays: data.data });
        }
      } catch (e) {
        console.error(e);
      }
    },
    getVisitsForNextDays: async (id, start, end) => {
      const payload = {
        paginationMethod: 'full',
        page: 1,
        pageSize: 20,
      };

      const params = {
        performer_id: id,
        planned_after: start,
        planned_before: end,
      };

      try {
        const { data } = await fetchVisits(
          payload,
          params as IFetchVisitsRequest
        );
        if (data) {
          set({
            visitsForNextDays: data.data,
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
  }))
);
