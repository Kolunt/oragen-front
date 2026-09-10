import React, { FC, memo, useState } from 'react';
import { Icon } from 'ui-kit';
import { IRemoteUser } from '../../hooks/useRemoteUsersVideoCall';
import classNames from 'classnames';
import { VideoUnit } from '../VideoUnit/VideoUnit';
import './Chatterer.scss';
import { useFullScreenModeVideoCall } from '../../../../store/useFullScreenModeVideoCall';

interface IChatterer {
  user: IRemoteUser;
  toggleUserMute: (id: number) => void;
  toggleUserVideo: (id: number) => void;
  checkCallOwner: boolean;
  sendMessage: (newMessage: string) => void;
}

export const Chatterer: FC<IChatterer> = memo((props) => {
  const { user, toggleUserMute, toggleUserVideo, checkCallOwner, sendMessage } =
    props;
  const fullScreenUserId = useFullScreenModeVideoCall(
    (state) => state.fullScreenUserId
  );
  const isFullScreen = fullScreenUserId === user.id;

  return (
    <div
      className={classNames('Chatterer', {
        Chatterer__active: isFullScreen,
      })}
    >
      <VideoUnit
        id={user.id}
        audioStream={user.audioTrack}
        videoStream={user.videoTrack}
        display={user.display}
        isControlPanel={!isFullScreen}
        isMute={user.mute}
        isScreenSharing={user.isScreenSharing}
        toggleMute={() => toggleUserMute(user.id)}
        checkCallOwner={checkCallOwner}
        sendMessage={sendMessage}
      />
    </div>
  );
});
