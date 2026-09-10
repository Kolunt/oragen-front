import React, { FC, memo, useRef } from 'react';
import './VideoBottomPanel.scss';

interface IVideoBottomPanel {
  videoStream: MediaStream;
}

export const VideoBottomPanel: FC<IVideoBottomPanel> = memo((props) => {
  const { videoStream } = props;
  const video = useRef<HTMLVideoElement>(null);

  if (videoStream instanceof MediaStream) {
    if (video.current) video.current.srcObject = videoStream;
  }

  return (
    <div className='VideoBottomPanel'>
      <video ref={video} className='CustomVideo' autoPlay />
    </div>
  );
});
