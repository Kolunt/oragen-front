import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { EventTypes } from 'enums';
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  fetchForceFinish,
  fetchForceStart,
  fetchPlusDuration,
  IGetEvent,
  IPlusDurationEvent,
} from '../api/eventsApi';
import { useAuthStore } from '../pages/MainPage/useAuthStore';
import { persist } from 'zustand/middleware';
import { useMessageStore } from 'components';

export type EventTypeCalendar = EventTypes.CALL;

export type VideoCallStatusType = 'upcoming' | 'live' | 'archived';

export interface ICreateEventPayload {
  name: string;
  type: string;
  duration: number;
  participants: number;
  participantsList: number[];
  started_at: string;
  description: string;
}

export interface IEvent {
  id: number;
  owner_id: number;
  name: string;
  description: string;
  type: EventTypes;
  status: VideoCallStatusType;
  duration: number;
  participants: number;
  started_at: string;
  finished_at: string;
  unit_url: null | string;
  room_id: null | number;
  room_secret: null | string;
  created_at: Date;
  updated_at: Date;
  room_pin: string;
  room_token: string;
}

interface IEventsStore {
  monitoredEvent: IEvent;
  events: IEvent[];
  currentPage: number;
  pageSize: number;
  numberOfEvents: number;
  addMonitoredEvent: (id: number) => void;
  getEvents: (params?: IGetEvent) => void;
  addEvent: (newContact: ICreateEventPayload) => void;
  removeEvent: (id: number) => void;
  forceStart: (id: number) => void;
  forceFinish: (id: number) => void;
  plusDuration: (params: IPlusDurationEvent) => void;
  search: string;
  setSearch: (value: string) => void;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
}

export const useEventsStore = create<IEventsStore>()(
  persist(
    immer((set, get) => ({
      monitoredEvent: {} as IEvent,
      events: [],
      currentPage: 1,
      pageSize: 10,
      numberOfEvents: 0,
      search: '',
      setSearch: (value) => set({ search: value }),
      addMonitoredEvent: (id) => {
        set((state) => {
          const newMonitoredEvent = state.events.find((item) => item.id === id);
          if (newMonitoredEvent) {
            state.monitoredEvent = newMonitoredEvent;
          }
        });
      },
      getEvents: async () => {
        useAuthStore.getState().setLoading(true);

        const like = JSON.stringify({
          // name: get().filtration.search,
          name: get().search,
        });

        const params: IGetEvent = {
          like,
        };

        const payload = {
          paginationMethod: 'full',
          page: get().currentPage,
          pageSize: get().pageSize,
        };

        try {
          const { data } = await fetchEvents(payload, params);
          if (data) {
            set({
              events: data.data,
              currentPage: data.current_page,
              numberOfEvents: data.total,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      addEvent: async (newEvent) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await createEvent(newEvent);
          if (data.success) {
            useMessageStore
              .getState()
              .showMessage('success', 'Мероприятие успешно создано!');
            useEventsStore.getState().getEvents();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      removeEvent: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await deleteEvent(id);
          if (data.success) {
            useMessageStore
              .getState()
              .showMessage('success', 'Мероприятие удалено!');
            useEventsStore.getState().getEvents();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      forceStart: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          await fetchForceStart(id);
          useEventsStore.getState().getEvents();
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      forceFinish: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          await fetchForceFinish(id);
          useEventsStore.getState().getEvents();
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      plusDuration: async (params) => {
        useAuthStore.getState().setLoading(true);
        try {
          await fetchPlusDuration(params);
          useEventsStore.getState().getEvents();
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setCurrentPage: (currentPage) => set({ currentPage: currentPage }),
      setPageSize: (pageSize) => set({ pageSize: pageSize }),
    })),
    {
      name: 'monitoredEvent',
      partialize: (state) => ({ monitoredEvent: state.monitoredEvent }),
    }
  )
);
