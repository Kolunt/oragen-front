import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { IContact } from './useContactsStore';
import { IEvent } from './useEventsStore';
import { IOrganization } from './useOrganizationsStore';
import { NewsTypes } from 'enums';
import { IFakeTarget } from 'mockData/mockData';

export type NewsType =
  | NewsTypes.CONTACT
  | NewsTypes.EVENT
  | NewsTypes.ORGANIZATION
  | NewsTypes.TARGET
  | NewsTypes.APPLICATION
  | NewsTypes.VISIT;

export type DataNewsType = IContact | IEvent | IOrganization | IFakeTarget;
// | IVisit;

export interface INews {
  id: string;
  type: NewsType;
  data: DataNewsType;
  creationDate: Date;
}

interface INewsStore {
  news: INews[];
  addNews: (id: string, type: NewsType, data: DataNewsType) => void;
  changeNews: (id: string, newData: DataNewsType) => void;
  removeNews: (id: string) => void;
}

export const useNewsStore = create<INewsStore>()(
  persist(
    immer((set) => ({
      news: [],
      addNews: (id, type, data) =>
        set((state) => {
          const date: Date = new Date();
          const newApplication = { id, type, data, creationDate: date };

          state.news = [newApplication, ...state.news];
        }),
      changeNews: (id, newData) =>
        set((state) => {
          state.news = state.news.map((item) =>
            item.id === id ? { ...item, data: newData } : item
          );
        }),
      removeNews: (id) =>
        set((state) => {
          state.news = state.news.filter((item) => item.id !== id);
        }),
    })),
    { name: 'news' }
  )
);
