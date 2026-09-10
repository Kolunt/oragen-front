import React, { FC, useEffect, useMemo, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  emailValidation,
  passwordValidation,
} from '../../../../validation/validation';
import { Button, InputForm } from '../../../../ui-kit';
import { PasswordInput } from '../../../../ui-kit/InputForm/PasswordInput/PasswordInput';
import { ROUTES } from '../../../../enums';
import { useNavigate } from 'react-router-dom';
import { IChangePassword } from '../../../../api/forgotPasswordApi';

interface IFormChangePassword {
  getPayload: (payload: IChangePassword) => void;
  email: string;
}

export const FormChangePassword: FC<IFormChangePassword> = ({
  getPayload,
  email,
}) => {
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm<IChangePassword>({
    defaultValues: {
      email: '',
      password: '',
      password_confirmation: '',
      code: '',
    },
  });

  useEffect(() => {
    setValue('email', email);
  }, [email]);

  const onSubmit: SubmitHandler<IChangePassword> = (data) => {
    const { password, password_confirmation } = data;
    if (password === password_confirmation) {
      getPayload(data);
    } else {
      setError('Пароли не совпадают');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-20 w-full'>
      <Controller
        control={control}
        name='email'
        rules={emailValidation}
        render={({ field }) => (
          <InputForm
            disabled={true}
            className='fz-13 pb-10'
            value={email}
            onChange={(e) => field.onChange(e)}
            placeholder='Укажите email'
            label='Email'
            error={errors.email && errors.email.message}
          />
        )}
      />
      <Controller
        control={control}
        name='code'
        render={({ field }) => (
          <InputForm
            className='fz-13 pb-10'
            value={field.value}
            onChange={(e) => field.onChange(e)}
            placeholder='Введите код из почты'
            label='Введите код из почты'
            error={errors.code && errors.code.message}
          />
        )}
      />
      <Controller
        control={control}
        name='password'
        rules={passwordValidation}
        render={({ field }) => (
          <PasswordInput
            // @ts-ignore
            className='fz-13 pb-10 '
            value={field.value}
            // @ts-ignore
            onChange={(e) => field.onChange(e)}
            placeholder='Введите новый пароль'
            label='Введите новый пароль'
            error={(errors.password && errors.password.message) || error}
          />
        )}
      />
      <Controller
        control={control}
        name='password_confirmation'
        rules={passwordValidation}
        render={({ field }) => (
          <PasswordInput
            // @ts-ignore
            className='fz-13 pb-10'
            value={field.value}
            // @ts-ignore
            onChange={(e) => field.onChange(e)}
            placeholder='Повторите новый пароль'
            label='Повторите новый пароль'
            error={
              (errors.password_confirmation &&
                errors.password_confirmation.message) ||
              error
            }
          />
        )}
      />
      <div className='mt-20'>
        <Button type='submit'>Отправить</Button>
        <Button
          className='btn transparent ml-20'
          onClick={() => navigate(`${ROUTES.MAIN}`)}
        >
          Отмена
        </Button>
      </div>
    </form>
  );
};
