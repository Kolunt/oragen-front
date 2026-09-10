import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { ITask, IUpdatedTask } from '../../../store/useTasksStore';

interface IUseSubTaskStore {
  updatedSubTask: IUpdatedTask;
  setSubUpdatedTask: (payload: IUpdatedTask) => void;
}

export const useSubTaskStore = create<IUseSubTaskStore>()(
  persist(
    immer((set, get) => ({
      updatedSubTask: {} as IUpdatedTask,
      setSubUpdatedTask: (payload) => {
        set({ updatedSubTask: payload });
      },
    })),
    {
      name: 'subTask',
      partialize: (state) => ({}),
    }
  )
);
