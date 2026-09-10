import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import {
  fetchContactApplications,
  fetchOrganizationApplications,
  fetchVisits,
} from 'api';
import { IVisit } from 'api/visitsApi';
import { ITask } from 'store/useTasksStore';
import { fetchTasks, IGetTask } from 'api/tasksApi';
import { ApplicationType, IGetApplications } from 'store/useApplicationsStore';
import { fetchTargetListLocalById, ITarget } from 'api/targetListApi';
import {
  createNews,
  fetchListNews,
  fetchNews,
  ICreateNews,
  IGetNews,
  INew,
} from 'api/newsApi';

interface INews {}

interface INewsStore {
  newVisits: IVisit[];
  getNewVisits: (id: number) => void;
  newTasks: ITask[];
  getNewTasks: () => void;
  allApplication: ApplicationType[];
  getAllApplication: () => void;
  targetsLocal: ITarget[];
  getTargetListLocalById: (target_list_id: number[]) => void;
  news: INew[];
  getNews: () => void;
  createNews: (payload: ICreateNews) => void;
  newsList: [];
  getListNews: () => void;
}

export const useNewsStore = create<INewsStore>()(
  immer((set, get) => ({
    newVisits: [],
    newTasks: [],
    allApplication: [],
    targetsLocal: [],
    news: [],
    newsList: [],
    getNewVisits: async (id) => {
      const payload = {
        paginationMethod: 'full',
        page: 1,
        pageSize: 10,
      };
      const params = {
        performer_id: id,
        orderBy: 'asc',
      };
      try {
        const { data } = await fetchVisits(payload, params);
        if (data) {
          set({ newVisits: data.data });
        }
      } catch (e) {
        console.log(e);
      }
    },
    // todo чтобы получить список нужно передать mode
    // но при этом получать будем только одного статуса
    getNewTasks: async () => {
      const payload = {
        paginationMethod: 'full',
        page: 1,
        pageSize: 20,
      };
      const params: IGetTask = {
        showSubTasks: false,
        orderBy: 'asc',
        mode: 'performed',
      };

      try {
        const { data } = await fetchTasks(payload, params);

        if (data) {
          set({
            newTasks: data.data,
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    getAllApplication: async () => {
      const params: IGetApplications = {
        // @ts-ignore
        order: 'created_at',
        orderBy: 'asc',
      };
      const payload = {
        paginationMethod: 'full',
        page: 1,
        pageSize: 20,
      };
      try {
        const [
          {
            data: { data: org },
          },
          {
            data: { data: cont },
          },
        ] = await Promise.all([
          // @ts-ignore
          fetchContactApplications(payload, params),
          // @ts-ignore
          fetchOrganizationApplications(payload, params),
        ]);
        set({
          allApplication: [...org, ...cont],
        });
      } catch (e) {
        console.error(e);
      }
    },
    getTargetListLocalById: async (target_list_id) => {
      try {
        Promise.all(
          target_list_id.map((id) => {
            return fetchTargetListLocalById(id);
          })
        ).then((result) => {
          return set({ targetsLocal: result.map(({ data }) => data) as [] });
        });
      } catch (e) {
        console.error(e);
      }
    },
    getNews: async () => {
      const payload = {
        paginationMethod: 'full',
        page: 1,
        pageSize: 20,
      };
      const params: IGetNews = {
        order: 'created_at',
        orderBy: 'desc',
      };
      try {
        const { data } = await fetchNews(payload, params);
        if (data) {
          set({
            news: data.data,
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    createNews: async (payload) => {
      try {
        await createNews(payload);
      } catch (e) {
        console.error(e);
      }
    },
    getListNews: async () => {
      const payload = {
        options: [
          {
            type: 'getOrganizationProposal',
            paginationMethod: 'full',
            page: '1',
            pageSize: '20',
            order: 'created_at',
            orderBy: 'asc',
          },
          {
            type: 'getContactProposal',
            user_agreement: '1',
            user_agreement_contact: '1',
            paginationMethod: 'full',
            page: '1',
            pageSize: '20',
            order: 'created_at',
            orderBy: 'asc',
          },
          {
            type: 'getTask',
            paginationMethod: 'full',
            page: '1',
            pageSize: '20',
            showSubTasks: 'false',
            orderBy: 'asc',
            mode: 'performed',
          },
          {
            type: 'getNews',
            paginationMethod: 'full',
            page: '1',
            pageSize: '20',
            order: 'created_at',
            orderBy: 'desc',
          },
          {
            type: 'getVisit',
            paginationMethod: 'full',
            page: '1',
            pageSize: '10',
            orderBy: 'asc',
          },
        ],
      };
      try {
        await fetchListNews(payload);
      } catch (e) {
        console.error(e);
      }
    },
  }))
);
