import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { IFakeContact } from 'mockData/mockData';

interface IGeoTargetingStore {
  monitoredGeoTarget: IFakeContact;
  setMonitoredGeoTarget: (newGeoTarget: IFakeContact) => void;
}

export const useGeoTargetingStore = create<IGeoTargetingStore>()(
  persist(
    immer((set) => ({
      monitoredGeoTarget: {} as IFakeContact,
      setMonitoredGeoTarget: (newGeoTarget) => {
        set({ monitoredGeoTarget: newGeoTarget });
      },
    })),
    { name: 'getTargeting' }
  )
);
