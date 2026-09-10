import React, { FC, useEffect, useState } from 'react';
import { Button, Icon } from 'ui-kit';
import { IMe } from '../../hooks/useMeVideoCall';
import { IMyScreenVideo } from '../../hooks/useMyScreenVideo';
import { VideoMe } from './VideoMe/VideoMe';
import classNames from 'classnames';
import { useFullScreenModeVideoCall } from '../../../../store/useFullScreenModeVideoCall';
import './OwnerPanel.scss';
import { IRemoteUser } from '../../hooks/useRemoteUsersVideoCall';

interface IOwnerPanel {
  owner: IMe;
  users: IRemoteUser[];
  myVideoScreen: IMyScreenVideo;
  toggleMuteVideo: () => void;
  toggleMute: () => void;
  toggleIsShowChat: () => void;
  destroyVideoCall: () => void;
  toggleScreenDisplay: () => void;
  numberNewMessages: number;
  setNumberNewMessages: (numberNewMessages: number) => void;
}

export const OwnerPanel: FC<IOwnerPanel> = (props) => {
  const {
    owner,
    users,
    myVideoScreen,
    toggleIsShowChat,
    toggleMute,
    toggleMuteVideo,
    destroyVideoCall,
    toggleScreenDisplay,
    numberNewMessages,
    setNumberNewMessages,
  } = props;
  const [isShowChat, setIsShowChat] = useState<boolean>(false);
  const isFullScreen = useFullScreenModeVideoCall(
    (state) => state.isFullScreen
  );
  const fullScreenUserId = useFullScreenModeVideoCall(
    (state) => state.fullScreenUserId
  );
  const setFullScreen = useFullScreenModeVideoCall(
    (state) => state.toggleFullScreen
  );

  useEffect(() => {
    if (!users.find((user) => user.id === fullScreenUserId)) {
      setFullScreen(false);
    }
  }, [users.length]);

  const handlerIsShowChat = () => {
    setIsShowChat((prev) => !prev);
    toggleIsShowChat();
    setNumberNewMessages(0);
  };

  const toggleFullScreenMode = () => {
    toggleScreenDisplay();
    // setFullScreen(!isFullScreen)
  };

  return (
    <div className='OwnerPanel'>
      <div
        className={classNames('Avatar', {
          Avatar__active: isFullScreen,
        })}
      >
        <VideoMe videoStream={owner.videoTrack} isShowVideo={owner.video} />
        {isFullScreen && (
          <div className='Avatar__ControlPanel'>
            {owner.video ? (
              <Icon type={'VideoOn'} onClick={toggleMuteVideo} />
            ) : (
              <Icon type={'VideoOff'} onClick={toggleMuteVideo} />
            )}
            {owner.sound ? (
              <Icon type={'MicrophoneClose'} onClick={toggleMute} />
            ) : (
              <Icon type={'MicrophoneOpen'} onClick={toggleMute} />
            )}
            {isShowChat ? (
              <Icon
                className='ChatOn'
                type={'VideoChat'}
                onClick={handlerIsShowChat}
              />
            ) : (
              <Icon
                className='ChatOff'
                type={'VideoChat'}
                onClick={handlerIsShowChat}
              />
            )}
            {myVideoScreen.video ? (
              <Icon type={'ScreenShare'} onClick={toggleFullScreenMode} />
            ) : (
              <Icon type={'ScreenDisabled'} onClick={toggleFullScreenMode} />
            )}
          </div>
        )}
      </div>

      <div className='ControlsButtons'>
        <div className='ControlsButtons__Item'>
          <span>{owner.display}</span>
        </div>

        <div className='ControlsButtons__Item' onClick={toggleMuteVideo}>
          <Icon type={'VideoVideoCamera'} />
          <span>{owner.video ? 'Выключить камеру' : 'Включить камеру'}</span>
        </div>

        <div className='ControlsButtons__Item' onClick={toggleMute}>
          <Icon type={'VideoMicrophone'} />
          <span>{owner.sound ? 'Включить звук' : 'Заглушить'}</span>
        </div>

        <div className='ControlsButtons__Item' onClick={handlerIsShowChat}>
          <Icon type={'VideoChat'} />
          <span>{isShowChat ? 'Скрыть чат' : 'Чат'}</span>
          {numberNewMessages !== 0 && !isShowChat && (
            <span className='ModalNewMessage'>{numberNewMessages}</span>
          )}
        </div>

        <div className='ControlsButtons__Item' onClick={toggleScreenDisplay}>
          <Icon type={'VideoScreen'} />
          <span>
            {myVideoScreen.video ? 'Завершить демонстрацию' : 'Демонстрация'}
          </span>
        </div>
      </div>
      <div className='ActionButtons'>
        <Button className='CustomButton' onClick={destroyVideoCall}>
          Покинуть звонок
        </Button>

        {/*<Button*/}
        {/*  className='VideoCallPage__End'*/}
        {/*  onClick={destroyVideoCall}*/}
        {/*>*/}
        {/*  Завершить трансляцию*/}
        {/*</Button>*/}
      </div>

      {/*<div className='ScreenVideo'>*/}
      {/*  <ScreenVideo videoStream={myVideoScreen.videoTrack} />*/}
      {/*</div>*/}
    </div>
  );
};
