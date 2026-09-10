import React, { FC, memo, useRef } from 'react';
import ContactImg from '../../../../../assets/svg/contacts/ContactsPerson.svg';
import './VideoMe.scss';

interface IVideoMe {
  videoStream: MediaStream;
  isShowVideo?: boolean;
}

export const VideoMe: FC<IVideoMe> = memo((props) => {
  const { videoStream, isShowVideo = true } = props;
  const video = useRef<HTMLVideoElement>(null);

  if (videoStream instanceof MediaStream) {
    if (video.current) video.current.srcObject = videoStream;
  }

  return (
    <div className='VideoMe'>
      <video
        ref={video}
        className={isShowVideo ? 'CustomVideo' : 'CustomVideo Hidden'}
        autoPlay
      />
      {!isShowVideo && (
        <img className='VideoMe__Image' src={ContactImg} alt='' />
      )}
    </div>
  );
});
