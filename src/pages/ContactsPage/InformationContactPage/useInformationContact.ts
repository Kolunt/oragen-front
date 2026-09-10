import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { fetchVisits } from '../../../api';
import { IFetchVisitsRequest, IVisit } from '../../../api/visitsApi';
import { fetchLoyality, IFetchLoyalityRequest } from '../../../api/loyalityApi';
import { IDrug } from '../../../api/drugsApi';

interface IInformationContact {
  visitsForContact: IVisit[];
  loyalityForContact: IDrug[];
  getVisitsForContact: (idContact: string) => void;
  getLoyalityForContact: (idContact: string) => void;
  currentPage: number;
  pageSize: number;
  numberOfVisits: number;
  setCurrentPage: (currentPage: number) => void;
  setPageSize: (pageSize: number) => void;
}

export const useInformationContact = create<IInformationContact>()(
  persist(
    immer((set, get) => ({
      visitsForContact: [],
      loyalityForContact: [],
      currentPage: 1,
      pageSize: 10,
      numberOfVisits: 0,
      getVisitsForContact: async (idContact) => {
        const params = {
          contact_id: idContact,
          status: 'finished',
        };
        try {
          // @ts-ignore
          const { data } = await fetchVisits(
            // @ts-ignore
            params as IFetchVisitsRequest
          );
          if (data) {
            set({
              visitsForContact: data.data,
            });
          }
        } catch (e) {
          console.error(e);
        }
      },
      getLoyalityForContact: async (idContact) => {
        const params: IFetchLoyalityRequest = {
          // @ts-ignore
          id: idContact,
        };
        try {
          const { data } = await fetchLoyality(params);
          if (data) {
            set({
              loyalityForContact: data.drugs,
            });
          }
        } catch (e) {
          console.error(e);
        }
      },
      setCurrentPage: (currentPage) => set({ currentPage: currentPage }),
      setPageSize: (pageSize) => set({ pageSize: pageSize }),
    })),
    {
      name: 'informationContact',
    }
  )
);
