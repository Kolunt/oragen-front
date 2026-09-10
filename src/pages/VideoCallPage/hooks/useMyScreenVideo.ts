import { useState } from 'react';

export interface IMyScreenVideo {
  videoTrack: any;
  videoRoomHandler: any;
  video: boolean;
}

export const useMyScreenVideo = () => {
  const [myScreenVideo, setMyScreenVideo] = useState<IMyScreenVideo>(
    {} as IMyScreenVideo
  );

  // Управление видео
  const toggleMuteScreenVideo = () => {
    let muted = myScreenVideo.videoRoomHandler.isVideoMuted();
    if (muted) {
      myScreenVideo.videoRoomHandler.unmuteVideo();
    } else {
      myScreenVideo.videoRoomHandler.muteVideo();
    }
    setMyScreenVideo((prev) => ({ ...prev, video: !prev.video }));
  };

  return { myScreenVideo, setMyScreenVideo, toggleMuteScreenVideo };
};
