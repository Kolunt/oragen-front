import React, { FC, memo, useRef } from 'react';
import './ScreenVideo.scss';

interface IScreenVideo {
  videoStream?: MediaStream;
  isShowVideo?: boolean;
}

export const ScreenVideo: FC<IScreenVideo> = memo((props) => {
  const { videoStream, isShowVideo } = props;
  const video = useRef<HTMLVideoElement>(null);

  if (videoStream instanceof MediaStream) {
    if (video.current) video.current.srcObject = videoStream;
  }

  return (
    <div className='ScreenVideo'>
      <video ref={video} className='CustomVideo' autoPlay />
    </div>
  );
});
