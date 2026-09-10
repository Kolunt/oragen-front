import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useAuthStore } from '../pages/MainPage/useAuthStore';
import {
  fetchVideoCall,
  IKickUserRequest,
  ISwitchUserSoundRequest,
  kickUserFromVideoCall,
  switchUserSound,
} from 'api/videoCallApi';
import { useEventsStore } from './useEventsStore';
import {
  attachPluginEndpoint,
  createPluginEndpoint,
  getListParticipants,
} from '../api/janusRoomApi';
import { persist } from 'zustand/middleware';

export type VideoCallType = 'event' | 'remoteVisit';

export interface IVideoCallUser {
  id: number;
  owner_id: number;
  name: string;
  description: string;
  type: string;
  status: string;
  duration: number;
  participants: number;
  started_at: string;
  finished_at: string;
  unit_url: string;
  room_id: number;
  janus_url: string;
  room_pin: string;
  room_token: string;
}

interface IUseVideoCallStore {
  type: VideoCallType;
  ownerId: number | undefined;
  roomId: number | undefined;
  unitUrl: string;
  roomPin: string;
  roomToken: string;
  eventTitle: string;
  eventDescription: string;
  eventDuration?: number;
  limitParticipants?: number;
  participants: any[];
  getVideoCallData: (id: string) => void;
  muteUser: (payload: ISwitchUserSoundRequest) => void;
  kickUser: (payload: IKickUserRequest) => void;
  getListParticipants: () => void;
  setTypeVideoCall: (type: VideoCallType) => void;
}

export const useVideoCallStore = create<IUseVideoCallStore>()(
  persist(
    immer((set) => ({
      type: 'event',
      ownerId: undefined,
      unitUrl: '',
      roomId: undefined,
      roomPin: '',
      roomToken: '',
      eventTitle: '',
      eventDescription: '',
      eventDuration: undefined,
      limitParticipants: undefined,
      participants: [],
      getVideoCallData: async (id) => {
        useAuthStore.getState().setLoading(true);
        try {
          const { data } = await fetchVideoCall(+id);
          if (data) {
            set({
              unitUrl: data.janus_url,
              roomId: data.room_id,
              roomPin: data.room_pin,
              roomToken: data.room_token,
              ownerId: data.owner_id,
              eventTitle: data.name,
              eventDescription: data.description,
              eventDuration: data.duration,
              limitParticipants: data.participants,
            });
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      muteUser: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          await switchUserSound(payload);
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      kickUser: async (payload) => {
        useAuthStore.getState().setLoading(true);
        try {
          await kickUserFromVideoCall(payload);
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      getListParticipants: async () => {
        useAuthStore.getState().setLoading(true);
        const token = useEventsStore.getState().monitoredEvent.room_token;
        const roomId = useEventsStore.getState().monitoredEvent.room_id;
        try {
          const janusCreate: any = await createPluginEndpoint(token);

          if (janusCreate.data.janus === 'success') {
            const janusAttach: any = await attachPluginEndpoint(
              token,
              janusCreate.data.data.id
            );

            if (janusAttach.data.janus === 'success') {
              const { data }: any = await getListParticipants(
                token,
                janusCreate.data.data.id,
                janusAttach.data.data.id,
                roomId
              );

              if (data) {
                set({ participants: data.plugindata.data.participants });
              }
            }
          }
        } finally {
          useAuthStore.getState().setLoading(false);
        }
      },
      setTypeVideoCall: (type) => set({ type: type }),
    })),
    {
      name: 'videocall',
      partialize: (state) => ({
        type: state.type,
      }),
    }
  )
);
