import { useState } from 'react';

export interface IMe {
  id: number;
  display: any;
  videoTrack: any;
  videoRoomHandler: any;
  textRoomHandler: any;
  sound: boolean;
  video: boolean;
}

export const useMeVideoCall = () => {
  const [me, setMe] = useState<IMe>({} as IMe);

  // Управление звуком
  const toggleMute = () => {
    let muted = me.videoRoomHandler.isAudioMuted();
    // Janus.log((muted ? 'Unmuting' : 'Muting') + ' local stream...');
    if (muted) {
      me.videoRoomHandler.unmuteAudio();
    } else {
      me.videoRoomHandler.muteAudio();
    }
    setMe((prev) => ({ ...prev, sound: !prev.sound }));
  };

  // Управление видео
  const toggleMuteVideo = () => {
    let muted = me.videoRoomHandler.isVideoMuted();
    // Janus.log((muted ? 'Unmuting' : 'Muting') + ' local stream...');
    if (muted) {
      me.videoRoomHandler.unmuteVideo();
    } else {
      me.videoRoomHandler.muteVideo();
    }
    setMe((prev) => ({ ...prev, video: !prev.video }));
  };

  return { me, setMe, toggleMute, toggleMuteVideo };
};
