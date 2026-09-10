import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createBlockSource } from 'api/brickApi';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { useBrickStore } from 'store/useBrickStore';
import { useMessageStore } from 'components/MessageComponent';

interface IModalAddBrickStore {
  addBlockSource: (blockId: number, sourceId: number) => void;
}

export const useModalAddBrickStore = create<IModalAddBrickStore>()(
  immer((set, get) => ({
    addBlockSource: async (blockId, sourceId) => {
      useAuthStore.getState().setLoading(true);
      try {
        const { data } = await createBlockSource(blockId, sourceId);
        if (data.success) {
          useMessageStore
            .getState()
            .showMessage('success', 'Новый брик добавлен!');
          useBrickStore.getState().getMonitoredBlock(blockId);
        }
      } finally {
        useAuthStore.getState().setLoading(false);
      }
    },
  }))
);
