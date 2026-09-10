import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Chatterer } from './components/Chatterer/Chatterer';
import { useVideoCallStore } from 'store/useVideoCallStore';
import { useParams } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';
import { TextChat } from './components/TextChat/TextChat';
import { OwnerPanel } from './components/OwnerPanel/OwnerPanel';
import { useInit } from './hooks/useInit';
import { useMeVideoCall } from './hooks/useMeVideoCall';
import { useRemoteUsersVideoCall } from './hooks/useRemoteUsersVideoCall';
import { ITextСhatParticipants, useJanusInit } from './hooks/useJanusInit';
import { RegisterFormVideoCall } from './components/RegisterFormVideoCall/RegisterFormVideoCall';
import { useMyScreenVideo } from './hooks/useMyScreenVideo';
import { ChatterListBottomPanel } from './components/ChatterListBottomPanel/ChatterListBottomPanel';
import { TextChatSubscriberMode } from './components/TextChatSubscriberMode/TextChatSubscriberMode';
import classNames from 'classnames';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import './VideoCallPage.scss';

export const VideoCallPage = () => {
  const { eventId } = useParams();
  const server = useVideoCallStore((state) => state.unitUrl);
  // const server = 'wss://' + 'janus.conf.meetecho.com' + '/ws';
  const myroom = useVideoCallStore((state) => state.roomId);
  // const myroom = 5678;
  const roomPin = useVideoCallStore((state) => state.roomPin);
  const roomToken = useVideoCallStore((state) => state.roomToken);
  const token = useAuthStore((state) => state.token);
  const limitParticipants = useVideoCallStore(
    (state) => state.limitParticipants
  );
  const getVideoCallData = useVideoCallStore((state) => state.getVideoCallData);
  const ownerId = useVideoCallStore((state) => state.ownerId);
  const userIdFromAuth = useUserStore((state) => state.me.id);
  const userNickname = useUserStore((state) => state.me.name);
  const [subscriberMode, setSubscriberMode] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(userNickname ?? '');
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [isShowChat, setIsShowChat] = useState(false);
  const [numberNewMessages, setNumberNewMessages] = useState<number>(0);
  const [textChatParticipants, setTextChatParticipants] = useState<
    ITextСhatParticipants[]
  >([]);
  const listParticipants = useVideoCallStore((state) => state.participants);
  const getListParticipants = useVideoCallStore(
    (state) => state.getListParticipants
  );

  const checkCallOwner = useMemo(() => {
    return ownerId === userIdFromAuth;
  }, [ownerId, userIdFromAuth]);

  // Инициализация
  const { init } = useInit(server, myroom);
  // Мой стрим
  const { me, setMe, toggleMuteVideo, toggleMute } = useMeVideoCall();
  // Стримы удаленных пользователей
  const { users, setUsers, toggleUserVideo, toggleUserMute, removeUser } =
    useRemoteUsersVideoCall(eventId ?? '');
  // Моя трансляция экрана
  const { myScreenVideo, setMyScreenVideo, toggleMuteScreenVideo } =
    useMyScreenVideo();
  const {
    chatMessages,
    ready,
    registerVideoRoom,
    sendData,
    destroyVideoCall,
    toggleScreenDisplay,
    getNumberUsers,
    getVideoRoomParticipants,
  } = useJanusInit(
    init,
    me,
    setMe,
    setUsers,
    server,
    myroom,
    username,
    roomToken,
    roomPin,
    setIsRegister,
    setUsername,
    myScreenVideo,
    setMyScreenVideo,
    setNumberNewMessages,
    textChatParticipants,
    setTextChatParticipants,
    limitParticipants,
    checkCallOwner
  );

  // useEffect(() => {
  //   if (eventId)
  // },[])

  useEffect(() => {
    if (eventId) {
      getVideoCallData(eventId);
    }

    return () => {
      destroyVideoCall();
    };
  }, []);

  // Показать чат
  const toggleIsShowChat = () => {
    setIsShowChat((prev) => !prev);
  };

  const handlerSetUserName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e) {
      setUsername(e.currentTarget.value);
    }
  };

  // Тестовая функция
  const printUsers = () => {
    getNumberUsers();
  };

  // Тестовая функция
  const printUsers2 = () => {
    // getVideoRoomParticipants();
    getListParticipants();
  };

  return (
    <div className='VideoCallPage'>
      <Layout showSideMenu={!!token}>
        {/*<button className='Relative' onClick={printUsers}>*/}
        {/*  get text room*/}
        {/*</button>*/}
        {/*<button className='Relative2' onClick={printUsers2}>*/}
        {/*  get video room*/}
        {/*</button>*/}
        <div className='VideoChat'>
          {isRegister ? (
            <>
              <div
                className={classNames('ListChatterer', {
                  'ListChatterer--subscriber': subscriberMode,
                })}
              >
                {users.map((user) => (
                  <Chatterer
                    key={user.id}
                    user={user}
                    toggleUserMute={toggleUserMute}
                    toggleUserVideo={toggleUserVideo}
                    checkCallOwner={checkCallOwner}
                    sendMessage={sendData}
                  />
                ))}
                {!subscriberMode && <ChatterListBottomPanel users={users} />}
              </div>

              {!subscriberMode ? (
                <TextChat
                  messages={chatMessages}
                  textChatParticipants={textChatParticipants}
                  sendMessage={sendData}
                  isShow={isShowChat}
                  checkCallOwner={checkCallOwner}
                />
              ) : (
                <TextChatSubscriberMode
                  messages={chatMessages}
                  textChatParticipants={textChatParticipants}
                  checkCallOwner={checkCallOwner}
                />
              )}

              {!subscriberMode && (
                <OwnerPanel
                  owner={me}
                  users={users}
                  myVideoScreen={myScreenVideo}
                  toggleMuteVideo={toggleMuteVideo}
                  toggleMute={toggleMute}
                  toggleIsShowChat={toggleIsShowChat}
                  destroyVideoCall={destroyVideoCall}
                  toggleScreenDisplay={toggleScreenDisplay}
                  setNumberNewMessages={setNumberNewMessages}
                  numberNewMessages={numberNewMessages}
                />
              )}
            </>
          ) : (
            <RegisterFormVideoCall
              isLoading={ready}
              username={username}
              disabled={!!userNickname}
              changeUsername={handlerSetUserName}
              onRegister={registerVideoRoom}
              setSubscriberMode={setSubscriberMode}
            />
          )}
        </div>
      </Layout>
    </div>
  );
};
