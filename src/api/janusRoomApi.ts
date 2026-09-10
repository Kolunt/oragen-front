import { randomString } from '../utils/randomString';
import axios from 'axios';

export interface ICreatePluginEndpoint {
  janus: string;
  token: string;
  transaction: string;
}

export interface IParticipantsItem {
  display: string;
  id: number;
  publisher: boolean;
  talking: boolean;
}

export const createPluginEndpoint = (token: string) => {
  const data = JSON.stringify({
    janus: 'create',
    token: token,
    transaction: randomString(8),
  });

  return axios.post<any>('https://janusdev2.oragen.ru:8089/janus', data);
};

export const attachPluginEndpoint = (token: string, sessionId: string) => {
  const data = JSON.stringify({
    janus: 'attach',
    plugin: 'janus.plugin.videoroom',
    token: token,
    transaction: randomString(8),
  });

  return axios.post<any>(
    `https://janusdev2.oragen.ru:8089/janus/${sessionId}`,
    data
  );
};

export const getListParticipants = (
  token: string,
  sessionId: string,
  janusPluginId: string,
  roomId: number | null
) => {
  const data = JSON.stringify({
    janus: 'message',
    token: token,
    body: {
      request: 'listparticipants',
      room: roomId,
    },
    transaction: randomString(8),
  });

  return axios.post<any>(
    `https://janusdev2.oragen.ru:8089/janus/${sessionId}/${janusPluginId}`,
    data
  );
};
