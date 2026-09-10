import React, { FC, memo, useRef } from 'react';

interface IAudio {
  audioStream?: MediaStream;
}

export const Audio: FC<IAudio> = memo((props) => {
  const { audioStream } = props;
  const audio = useRef<HTMLAudioElement>(null);

  if (audioStream instanceof MediaStream) {
    if (audio.current) audio.current.srcObject = audioStream;
  }

  return <audio ref={audio} autoPlay />;
});
