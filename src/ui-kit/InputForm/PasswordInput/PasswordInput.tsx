import React, { FC, useState } from 'react';
import { Icon } from '../../Icon/Icon';
import './style.scss';
import { InputForm } from '../InputForm';

interface IPasswordInput {}

export const PasswordInput: FC<IPasswordInput> = (props) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  return (
    <div className='flex relative'>
      <InputForm type={isShowPassword ? 'text' : 'password'} {...props}>
        <div className='icon-password'>
          {isShowPassword ? (
            <Icon type='EyeOn' onClick={() => setIsShowPassword(false)} />
          ) : (
            <Icon type='EyeOff' onClick={() => setIsShowPassword(true)} />
          )}
        </div>
      </InputForm>
    </div>
  );
};
