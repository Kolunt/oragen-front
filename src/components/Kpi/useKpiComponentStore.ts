import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { fetchCalculateMyKpi, IKpi, ITargetListKpi } from 'api/kpiApi';
import dayjs from 'dayjs';

interface IKpiComponentStore {
  targets: ITargetListKpi[];
  commonData: IKpi;
  getKpi: () => void;
}

const initValue: IKpi = {
  week: { plan: 0, fact: 0, left: 0, percent: 0 },
  month: { plan: 0, fact: 0, left: 0, percent: 0 },
  cycle: { plan: 0, fact: 0, left: 0, percent: 0 },
};

export const useKpiComponentStore = create<IKpiComponentStore>()(
  immer((set, get) => ({
    commonData: initValue,
    targets: [],
    getKpi: async () => {
      useAuthStore.getState().setLoading(true);
      try {
        const timeZone = dayjs().utcOffset() / 60;
        const { data } = await fetchCalculateMyKpi(timeZone);
        if (data) {
          set({
            targets: data.targetLists,
            commonData: data.all,
          });
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
  }))
);
