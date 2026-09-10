import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { IVisit } from 'api/visitsApi';
import { persist } from 'zustand/middleware';
import { s3, S3_BUCKET } from 'pages/MediaPage';

interface IPresentationStore {
  links: object[];
  monitoredVisit: IVisit;
  setMonitoredVisit: (visit: IVisit) => void;
  getLinks: () => void;
  getLink: (key: string) => void;
}

export const usePresentationStore = create<IPresentationStore>()(
  persist(
    immer((set, get) => ({
      monitoredVisit: {} as IVisit,
      links: [],
      setMonitoredVisit: (visit) => set({ monitoredVisit: visit }),
      getLink: (key) => {
        const params = {
          Bucket: S3_BUCKET,
          Key: key,
        };
        const url = s3.getSignedUrl('getObject', params);
        set({ links: [...get().links, { [key]: url }] });
      },
      getLinks: () => {
        get().monitoredVisit.files?.map((item) => {
          get().getLink(item);
        });
      },
    })),
    {
      name: 'presentation',
      partialize: (state) => ({
        monitoredVisit: state.monitoredVisit,
      }),
    }
  )
);
