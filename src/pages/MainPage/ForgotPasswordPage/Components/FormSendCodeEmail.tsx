import React, { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { emailValidation } from '../../../../validation/validation';
import { Button, InputForm } from '../../../../ui-kit';
import { ROUTES } from '../../../../enums';
import { ISendCodeEmail } from '../../../../api/forgotPasswordApi';
import { useNavigate } from 'react-router-dom';

interface IFormSendCodeEmail {
  getPayload: (payload: ISendCodeEmail) => void;
  error: string;
}

export const FormSendCodeEmail: FC<IFormSendCodeEmail> = ({
  getPayload,
  error,
}) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ISendCodeEmail>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<ISendCodeEmail> = (data) => {
    getPayload(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='p-20 w-full'>
      <Controller
        control={control}
        name='email'
        rules={emailValidation}
        render={({ field }) => (
          <InputForm
            className='fz-13 pb-10'
            value={field.value}
            onChange={(e) => field.onChange(e)}
            placeholder='Укажите email'
            label='Email'
            error={(errors.email && errors.email.message) || error}
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
