import React, { FC, memo, useRef } from 'react';
import ContactImg from '../../../../assets/svg/contacts/ContactsPerson.svg';
import './Video.scss';
import classNames from 'classnames';

interface IVideo {
  videoStream: MediaStream;
  isFullScreen?: boolean;
}

export const Video: FC<IVideo> = memo((props) => {
  const { videoStream, isFullScreen } = props;
  const video = useRef<HTMLVideoElement>(null);

  if (videoStream instanceof MediaStream) {
    if (video.current) video.current.srcObject = videoStream;
  }

  return (
    <div className='Video'>
      <video
        ref={video}
        className={classNames('CustomVideo', {
          CustomVideo__fullscreen: isFullScreen,
        })}
        autoPlay
      />
    </div>
  );
});
