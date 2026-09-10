import React, { useMemo, useState } from 'react';
import { Button, Image, InputForm, Title } from '../../../ui-kit';
import Logo from '../../../assets/svg/logo/logo.svg';
import '../MainPage.scss';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ROUTES } from '../../../enums';
import { useNavigate } from 'react-router-dom';
import {
  changePassword,
  IChangePassword,
  ISendCodeEmail,
  sendCodeEmail,
} from '../../../api/forgotPasswordApi';
import { FormSendCodeEmail } from './Components/FormSendCodeEmail';
import { FormChangePassword } from './Components/FormChangePassword';
import { AxiosError } from 'axios';
import { useMessageStore } from '../../../components';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, sendEmail] = useState('');
  const [error, setError] = useState('');
  const showMessage = useMessageStore((state) => state.showMessage);
  const [showFormChangePassword, setShowFormChangePassword] = useState(false);

  const onChangePassword: SubmitHandler<IChangePassword> = async (payload) => {
    try {
      const { data } = await changePassword(payload);
      if (data.success) {
        showMessage('success', 'Пароль изменен!');
        navigate(ROUTES.MAIN);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onSendCodeEmail: SubmitHandler<ISendCodeEmail> = async (payload) => {
    const { email } = payload;
    try {
      const { data } = await sendCodeEmail(payload);
      if (data.success) {
        showMessage('success', 'Код отправлен на почту!');
        setShowFormChangePassword(true);
        sendEmail(email);
        setError('');
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const { response: { status, data } = {} } = e;
        setError(data.message);
      }
    }
  };

  return (
    <div className='MainPage'>
      <div className='header'>
        <div className='header__content'>
          <Image src={Logo} alt='Oragen' />
        </div>
      </div>
      <div className='flex pt-20 justify-center items-center flex-column w-700 bg-white-l1 ml-auto br-10 mr-auto mt-20'>
        <Title>Восстановление пароля</Title>
        {/*<div className="color-negative pt-10">{error}</div>*/}
        {!showFormChangePassword ? (
          <FormSendCodeEmail error={error} getPayload={onSendCodeEmail} />
        ) : (
          <FormChangePassword email={email} getPayload={onChangePassword} />
        )}
      </div>
    </div>
  );
};
