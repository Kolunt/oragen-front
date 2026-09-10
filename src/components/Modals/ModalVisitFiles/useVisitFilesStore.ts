import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import {
  fetchVisit,
  IUpdateVisitFilesPayload,
  updateVisitFiles,
} from 'api/visitsApi';
import { fetchVisitPharmacy } from 'api';
import { updateVisitPharmacyFiles } from 'api/visitsPharmacyApi';

interface IVisitFilesStore {
  keys: string[];
  monitoredVisitId?: number;
  setMonitoredVisitId: (id: number, isPharmacyMode?: boolean) => void;
  getKeys: () => void;
  removeFile: (key: string) => void;
  addFiles: (keys: string[]) => void;
  isPharmacyMode: boolean;
}

export const useVisitFilesStore = create<IVisitFilesStore>()(
  persist(
    immer((set, get) => ({
      keys: [],
      isPharmacyMode: false,
      setMonitoredVisitId: (id, type) => {
        set({ monitoredVisitId: id, isPharmacyMode: !!type });
      },
      getKeys: async () => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = get().isPharmacyMode
            ? await fetchVisitPharmacy(get().monitoredVisitId as number)
            : await fetchVisit(get().monitoredVisitId as number);
          if (data) {
            set({ keys: data.files ?? [] });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      removeFile: async (key) => {
        useAuthStore.getState().setLoading(true);

        const payload: IUpdateVisitFilesPayload = {
          visit_id: get().monitoredVisitId as number,
          files: JSON.stringify(get().keys.filter((item) => item !== key)),
        };

        try {
          const { data } = get().isPharmacyMode
            ? await updateVisitPharmacyFiles(payload)
            : await updateVisitFiles(payload);
          if (data.success) {
            get().getKeys();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      addFiles: async (keys) => {
        useAuthStore.getState().setLoading(true);

        const payload: IUpdateVisitFilesPayload = {
          visit_id: get().monitoredVisitId as number,
          files: JSON.stringify([...get().keys, ...keys]),
        };
        try {
          const { data } = get().isPharmacyMode
            ? await updateVisitPharmacyFiles(payload)
            : await updateVisitFiles(payload);
          if (data.success) {
            get().getKeys();
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
    })),
    {
      name: 'visits-files',
      partialize: (state) => ({
        visitId: state.monitoredVisitId,
        isPharmacyMode: state.isPharmacyMode,
      }),
    }
  )
);
