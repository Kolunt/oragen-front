import React, { FC } from 'react';
import { Audio } from '../../Audio/Audio';
import { VideoBottomPanel } from './VideoBottomPanel/VideoBottomPanel';
import { IRemoteUser } from '../../../hooks/useRemoteUsersVideoCall';
import { useFullScreenModeVideoCall } from '../../../../../store/useFullScreenModeVideoCall';
import './VideoUnitBottomPanel.scss';

interface IVideoUnitBottomPanel {
  user: IRemoteUser;
}

export const VideoUnitBottomPanel: FC<IVideoUnitBottomPanel> = (props) => {
  const { user } = props;
  const changeId = useFullScreenModeVideoCall(
    (state) => state.changeFullScreenUserId
  );
  const fullScreenUserId = useFullScreenModeVideoCall(
    (state) => state.fullScreenUserId
  );
  const generalFullScreen = useFullScreenModeVideoCall(
    (state) => state.generalFullScreen
  );

  const handleChangeId = () => {
    if (!generalFullScreen || +generalFullScreen !== fullScreenUserId) {
      changeId(user.id);
    }
  };

  return (
    <div className='VideoUnitBottomPanel' onClick={handleChangeId}>
      <Audio audioStream={user.audioTrack} />
      <VideoBottomPanel videoStream={user.videoTrack} />
    </div>
  );
};
