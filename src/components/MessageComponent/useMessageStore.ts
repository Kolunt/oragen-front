import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type MessageType = 'success' | 'error' | 'warning';

interface IMessageStore {
  isOpen: boolean;
  type: MessageType;
  content: string;
  showMessage: (type: MessageType, content: string) => void;
  setStatus: (value: boolean) => void;
}

export const useMessageStore = create<IMessageStore>()(
  immer((set, get) => ({
    isOpen: false,
    type: 'success',
    content: '',
    showMessage: (type, content) => set({ isOpen: true, type, content }),
    setStatus: (value) => set({ isOpen: value }),
  }))
);
