import { useState } from 'react';
import { useVideoCallStore } from '../../../store/useVideoCallStore';

export interface IRemoteUser {
  outHandleId: number;
  id: number;
  display: string;
  audioTrack: any;
  videoTrack: any;
  videoRoomHandler: any;
  mute: boolean;
  video: boolean;
  isScreenSharing: boolean;
}

export const useRemoteUsersVideoCall = (userId: string) => {
  const muteUser = useVideoCallStore((state) => state.muteUser);
  const [users, setUsers] = useState<IRemoteUser[]>([]);

  // Управление звуком users
  const toggleUserMute = (id: number) => {
    const currentUser = users.find((user) => user.id === id);

    // muteUser({
    //   mute: !currentUser?.mute,
    //   id: +userId,
    //   participantId: id,
    // });

    let audioTrack = currentUser?.audioTrack.getAudioTracks();
    audioTrack[0].enabled = !audioTrack[0].enabled;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, mute: !user.mute } : user
      )
    );
  };

  // Управление видео users
  const toggleUserVideo = (id: number) => {
    const currentUser = users.find((user) => user.id === id);

    let videoTrack = currentUser?.videoTrack.getVideoTracks();
    videoTrack[0].enabled = !videoTrack[0].enabled;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, video: !user.video } : user
      )
    );
  };

  // Удалить user
  const removeUser = (id: number) => {
    // const currentUser = users.find((user) => user.id === id);
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', currentUser);
    // kickUser({ id: userId, participantId: 2 });
    setUsers((prev) => prev.filter((user) => user.outHandleId !== id));
  };

  return { users, setUsers, toggleUserMute, toggleUserVideo, removeUser };
};
