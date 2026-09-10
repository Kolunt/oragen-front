import React, { useEffect, useState } from 'react';

import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import LogoLarge from 'assets/svg/logo/logo-large.svg';
import { useAuthStore } from 'pages/MainPage/useAuthStore';
import { Button, Checkbox, Icon, Image } from 'ui-kit';
import { ROUTES } from 'enums';
import { useLocation } from 'react-router';
import './AuthorizationForm.scss';
import { PasswordInput } from '../../../../ui-kit/InputForm/PasswordInput/PasswordInput';
import { passwordValidation } from '../../../../validation/validation';

interface ILoginForm {
  name: string;
  password: string;
}

export const AuthorizationForm = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const changeLoggedIn = useAuthStore((state) => state.changeLoggedIn);
  const errorAuth = useAuthStore((state) => state.errorAuth);
  const [checkedBox, setCheckedBox] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<ILoginForm>({
    defaultValues: {
      // name: 'orgadmin1@oragen.ru',
      // password: 'password123456',
      name: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      if (pathname.includes(ROUTES.VIDEO_CALL)) {
        navigate(0);
        navigate(pathname);
      } else {
        navigate(ROUTES.HOME);
      }
    }
  }, [isLoggedIn]);

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    changeLoggedIn(data.name, data.password);
  };
  return (
    <form className='AuthorizationForm' onSubmit={handleSubmit(onSubmit)}>
      <Image className='CustomImage' src={LogoLarge} alt='Oragen' />
      <h3 className='AuthorizationForm__Title'>Вход в Oragen</h3>
      {errorAuth &&
        errorAuth.length > 0 &&
        errorAuth?.map((item, index) => (
          <div key={index} className='color-negative mb-5'>
            {item}
          </div>
        ))}
      <div className='w-full mb-10'>
        <input
          className={`CustomInput ${
            errors?.name?.type || errorAuth.length > 0 ? 'error' : ''
          }`}
          placeholder='Почта'
          {...register('name', { required: true })}
        />
        {errors?.name?.type === 'required' && (
          <p className='fz-10 color-negative'>Обязательное поле</p>
        )}
      </div>
      <div className='w-full mb-10 relative'>
        <Controller
          control={control}
          name='password'
          rules={passwordValidation}
          render={({ field }) => (
            <PasswordInput
              // @ts-ignore
              value={field.value}
              // @ts-ignore
              onChange={(e) => field.onChange(e)}
              placeholder='Пароль'
              error={
                (errors?.password?.type === 'required'
                  ? 'Обязательное поле'
                  : '') || errorAuth.length > 0
              }
            />
          )}
        />
      </div>

      <div className='AuthorizationForm__SavePassword'>
        <div className='AuthorizationForm__Checkbox'>
          <Checkbox
            isChecked={checkedBox}
            label='Запомнить меня'
            onChange={(e) => setCheckedBox(e.target.checked)}
          />
        </div>
        <button type='button' className='ButtonLink pointer'>
          <NavLink to={ROUTES.FORGOT_PASSWORD}>Забыли пароль?</NavLink>
        </button>
      </div>
      <Button className='ButtonLogin mt-10' type={'submit'}>
        Войти
      </Button>
    </form>
  );
};
