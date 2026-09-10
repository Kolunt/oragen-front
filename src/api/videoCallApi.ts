import { authServiceClient } from 'config/authServiceClient';
import { AxiosResponse } from 'axios';
import { IGeneralRequest } from 'api/authApi';
import { IVideoCallUser } from 'store/useVideoCallStore';

export interface ISwitchUserSoundRequest {
  id: number;
  participantId: number;
  mid?: number;
  mute: boolean;
}

export interface IKickUserRequest {
  id: number;
  participantId: number;
}

export const fetchVideoCall = (id: number) => {
  return authServiceClient.post<
    IVideoCallUser,
    AxiosResponse<IVideoCallUser>,
    { id: number } & IGeneralRequest
  >('', { type: 'getVideocallByUser', id });
};

export const switchUserSound = (payload: ISwitchUserSoundRequest) => {
  return authServiceClient.post<
    IVideoCallUser,
    AxiosResponse<IVideoCallUser>,
    ISwitchUserSoundRequest & IGeneralRequest
  >('', { type: 'muteUserVideocall', ...payload });
};

export const kickUserFromVideoCall = (payload: IKickUserRequest) => {
  return authServiceClient.post<
    IVideoCallUser,
    AxiosResponse<IVideoCallUser>,
    IKickUserRequest & IGeneralRequest
  >('', { type: 'kickUserFromVideocall', ...payload });
};
