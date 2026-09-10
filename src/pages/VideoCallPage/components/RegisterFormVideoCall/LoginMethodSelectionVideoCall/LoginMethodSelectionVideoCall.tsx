import React, { ChangeEvent, FC, useState } from 'react';
import './LoginMethodSelectionVideoCall.scss';
import { AuthorizationForm } from 'components';
import { Button, Input } from 'ui-kit';

interface ILoginMethodSelectionVideoCall {
  username: string;
  changeUsername: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  handleRegister: (value: boolean) => void;
}

type AuthMethodType = 'withoutRegistration' | 'registration' | undefined;

export const LoginMethodSelectionVideoCall: FC<
  ILoginMethodSelectionVideoCall
> = (props) => {
  const { username, changeUsername, disabled, handleRegister } = props;
  const [isAuthMethod, setIsAuthMethod] = useState<AuthMethodType>(undefined);

  return (
    <div className='LoginMethodSelectionVideoCall'>
      <div className='BlockButton'>
        <Button
          className='CustomButton'
          onClick={() => setIsAuthMethod('registration')}
        >
          Регистрация
        </Button>
        <Button
          className='CustomButton'
          onClick={() => setIsAuthMethod('withoutRegistration')}
        >
          Войти без регистрации
        </Button>
      </div>

      {isAuthMethod === 'registration' && <AuthorizationForm />}

      {isAuthMethod === 'withoutRegistration' && (
        <div className='WithoutRegistration'>
          <Input
            className='CustomInput'
            placeholder='Введите ФИО для входа без регистрации'
            name={username}
            onChange={changeUsername}
            disabled={disabled}
          />
          <Button
            className='CustomButton'
            onClick={() => handleRegister(false)}
          >
            Войти без регистрации
          </Button>
        </div>
      )}
    </div>
  );
};
