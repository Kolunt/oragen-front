import React, { ChangeEvent, FC } from 'react';
import { Button } from 'ui-kit';
import { useVideoCallStore } from 'store/useVideoCallStore';
import { useLocation } from 'react-router';
import { ROUTES } from 'enums';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { LoginMethodSelectionVideoCall } from './LoginMethodSelectionVideoCall/LoginMethodSelectionVideoCall';
import './RegisterFormVideoCall.scss';

interface IRegisterFormVideoCall {
  isLoading: boolean;
  username: string;
  disabled: boolean;
  changeUsername: (e: ChangeEvent<HTMLInputElement>) => void;
  onRegister: (value: boolean) => void;
  setSubscriberMode: (value: boolean) => void;
}

export const RegisterFormVideoCall: FC<IRegisterFormVideoCall> = (props) => {
  const {
    isLoading,
    username,
    disabled,
    changeUsername,
    onRegister,
    setSubscriberMode,
  } = props;
  const { eventDescription, eventTitle, eventDuration } = useVideoCallStore(
    (state) => state
  );
  const token = useAuthStore((state) => state.token);
  const location = useLocation();
  const navigate = useNavigate();
  const { eventId } = useParams();

  const handleRegister = (value: boolean) => {
    onRegister(value);
    setSubscriberMode(value);
  };

  const subscriberCondition = location?.pathname.includes(
    ROUTES.SUBSCRIBE_VIDEO_CALL
  );

  if (subscriberCondition && token) {
    navigate(`${ROUTES.VIDEO_CALL}/${eventId}`);
  }

  return (
    <div className='RegisterFormVideoCall'>
      <h3 className='Title'>{eventTitle}</h3>
      <p className='SubTitle'>{eventDescription}</p>
      <p className='Date'>Длительность : {eventDuration} мин.</p>
      {isLoading && (
        <div className='flex mb-20 bg-background-l8 pt-20 pb-20 pr-26 pl-26 br-10'>
          {subscriberCondition ? (
            <Button
              className='CustomButton'
              onClick={() => handleRegister(true)}
            >
              Войти как слушатель
            </Button>
          ) : (
            <>
              <LoginMethodSelectionVideoCall
                username={username}
                changeUsername={changeUsername}
                disabled={disabled}
                handleRegister={handleRegister}
              />
              {/*  <InputForm*/}
              {/*      placeholder='Введите ФИО'*/}
              {/*      value={username}*/}
              {/*      onChange={changeUsername}*/}
              {/*      disabled={disabled}*/}
              {/*  />*/}
              {/*  <Button*/}
              {/*      className='CustomButton'*/}
              {/*      onClick={() => handleRegister(false)}*/}
              {/*  >*/}
              {/*    Войти*/}
              {/*  </Button>*/}
            </>
          )}
        </div>
      )}
    </div>
  );
};
