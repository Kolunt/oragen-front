import React, { FC, memo, useEffect } from 'react';
import { Video } from '../Video/Video';
import { Audio } from '../Audio/Audio';
import { Icon } from '../../../../ui-kit';
import { useFullScreenModeVideoCall } from '../../../../store/useFullScreenModeVideoCall';
import { ROUTES, TextChatInstructions } from '../../../../enums';
import './VideoUnit.scss';
import { useLocation } from 'react-router';

interface IVideoUnit {
  id: number;
  audioStream?: MediaStream;
  videoStream: MediaStream;
  display?: string;
  isControlPanel?: boolean;
  isMute?: boolean;
  toggleMute?: () => void;
  isScreenSharing?: boolean;
  checkCallOwner: boolean;
  sendMessage: (newMessage: string) => void;
}

export const VideoUnit: FC<IVideoUnit> = memo((props) => {
  const {
    id,
    audioStream,
    videoStream,
    display,
    isControlPanel,
    isMute,
    toggleMute,
    isScreenSharing,
    checkCallOwner,
    sendMessage,
  } = props;

  const fullScreenUserId = useFullScreenModeVideoCall(
    (state) => state.fullScreenUserId
  );
  const isFullScreen = useFullScreenModeVideoCall(
    (state) => state.isFullScreen
  );
  const toggleFullScreen = useFullScreenModeVideoCall(
    (state) => state.toggleFullScreen
  );
  const changeFullScreenUserId = useFullScreenModeVideoCall(
    (state) => state.changeFullScreenUserId
  );
  const toggleShowListChattererPanel = useFullScreenModeVideoCall(
    (state) => state.toggleShowListChattererPanel
  );
  const generalFullScreen = useFullScreenModeVideoCall(
    (state) => state.generalFullScreen
  );
  const toggleGeneralFullScreen = useFullScreenModeVideoCall(
    (state) => state.toggleGeneralFullScreen
  );
  const location = useLocation();

  useEffect(() => {
    if (generalFullScreen && +generalFullScreen === id) {
      changeFullScreenUserId(+generalFullScreen);
      toggleFullScreen(true);
      toggleShowListChattererPanel(false);
    }
    if (isFullScreen && !generalFullScreen) {
      changeFullScreenUserId(undefined);
      toggleFullScreen(!isFullScreen);
      toggleShowListChattererPanel(true);
    }
  }, [generalFullScreen]);

  const handleFullScreen = () => {
    changeFullScreenUserId(id);
    toggleFullScreen(!isFullScreen);
    toggleShowListChattererPanel(false);
  };
  const onPinClick = (id: number) => {
    toggleGeneralFullScreen(generalFullScreen ? '' : `${id}`);
    if (!generalFullScreen) {
      sendMessage(`${TextChatInstructions.OPEN_GENERAL_FULL_SCREEN}${id}`);
    }
    if (generalFullScreen) {
      sendMessage(TextChatInstructions.CLOSE_GENERAL_FULL_SCREEN);
    }
  };

  const subscriberCondition = location?.pathname.includes(
    ROUTES.SUBSCRIBE_VIDEO_CALL
  );

  return (
    <div className='VideoUnit'>
      <Audio audioStream={audioStream} />
      <Video
        videoStream={videoStream}
        isFullScreen={
          fullScreenUserId === id || fullScreenUserId === +generalFullScreen
        }
      />
      {isControlPanel && (
        <div className='VideoUnit__ControlPanel'>
          {isScreenSharing || subscriberCondition ? (
            <div />
          ) : (
            <div className='IconWrapper' onClick={toggleMute}>
              {isMute ? (
                <Icon type={'MicrophoneOpen'} />
              ) : (
                <Icon type={'MicrophoneClose'} />
              )}
            </div>
          )}
          <div className='Title'>{display}</div>
          {!subscriberCondition && (
            <div className='IconWrapper' onClick={handleFullScreen}>
              {isFullScreen ? (
                <Icon type={'FullScreenExit'} />
              ) : (
                <Icon type={'FullScreen'} />
              )}
            </div>
          )}
        </div>
      )}
      {checkCallOwner && (
        <div className='IconPinWrapper' onClick={() => onPinClick(id)}>
          {generalFullScreen ? (
            <Icon type={'PinSlashFill'} />
          ) : (
            <Icon type={'PinFill'} />
          )}
        </div>
      )}
    </div>
  );
});
