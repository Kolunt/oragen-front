import React, { useEffect, useMemo } from 'react';
import { Layout } from 'components/Layout/Layout';
import {
  Button,
  InputForm,
  ISelectOption,
  PhoneInput,
  SelectForm,
  Title,
} from 'ui-kit';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  emailValidation,
  fullNameValidation,
  passwordValidation,
} from 'validation/validation';
import { ROUTES } from 'enums';
import { useNavigate } from 'react-router-dom';
import { ICreateUserPayload } from 'api/userApi';
import { useUserStore } from 'store/useUserStore';
import { useRolesStore } from 'store/useRolesStore';
import { RoleTypeId } from 'api/rolesApi';
import { getFormatPhoneResponse } from 'utils/getFormatPhoneResponse';
import './AdministrationAddEmployee.scss';

interface INewEmployeeForm {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  role: ISelectOption;
  login: string;
  password: string;
}

export const AdministrationAddEmployee = () => {
  const addUser = useUserStore((state) => state.addUser);
  const rolesData = useRolesStore((state) => state.roles);
  const getRoles = useRolesStore((state) => state.getRoles);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<INewEmployeeForm>({
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '+7',
      role: undefined,
      login: '',
      password: '',
    },
  });

  useEffect(() => {
    getRoles();
  }, []);

  const roles: ISelectOption[] = useMemo(() => {
    return rolesData.map((role) => ({ value: `${role.id}`, label: role.name }));
  }, [rolesData]);

  const onSubmit: SubmitHandler<INewEmployeeForm> = (data) => {
    const payload: ICreateUserPayload = {
      first_name: data.firstName,
      middle_name: data.middleName,
      last_name: data.lastName,
      email: data.email,
      phone: getFormatPhoneResponse(data.phone),
      role: +data.role.value as RoleTypeId,
      name: data.login,
      password: data.password,
    };
    addUser(payload);
    reset();
    navigate(ROUTES.EMPLOYEES);
  };
  return (
    <>
      <Layout>
        <div className='mb-20'>
          <Title>Администрирование: добавление сотрудника</Title>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-white-l1 p-20 br-10 ContactsPageForm'
        >
          <div className='AddEmployeeFormGrid'>
            <Controller
              control={control}
              name='firstName'
              rules={fullNameValidation}
              render={({ field }) => (
                <InputForm
                  className='fz-13'
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  placeholder='Имя'
                  label='Имя'
                  error={errors.firstName && errors.firstName.message}
                />
              )}
            />
            <Controller
              control={control}
              name='middleName'
              rules={fullNameValidation}
              render={({ field }) => (
                <InputForm
                  className='fz-13'
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  placeholder='Отчество'
                  label='Отчество'
                  error={errors.middleName && errors.middleName.message}
                />
              )}
            />
            <Controller
              control={control}
              name='lastName'
              rules={fullNameValidation}
              render={({ field }) => (
                <InputForm
                  className='fz-13'
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  placeholder='Фамилия'
                  label='Фамилия'
                  error={errors.lastName && errors.lastName.message}
                />
              )}
            />
            <Controller
              control={control}
              name='role'
              rules={fullNameValidation}
              render={({ field }) => (
                <SelectForm
                  className='CustomSelect'
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  options={roles}
                  label='Должность'
                  error={errors.role && errors.role.message}
                />
              )}
            />
            <Controller
              control={control}
              name='email'
              rules={emailValidation}
              render={({ field }) => (
                <InputForm
                  className='fz-13'
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  placeholder='Укажите email'
                  label='Email'
                  error={errors.email && errors.email.message}
                />
              )}
            />
            <PhoneInput className='fz-13' control={control} errors={errors} />

            <Controller
              control={control}
              name='login'
              rules={fullNameValidation}
              render={({ field }) => (
                <InputForm
                  className='fz-13'
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  placeholder='Логин'
                  label='Логин'
                  error={errors.login && errors.login.message}
                />
              )}
            />
            <Controller
              control={control}
              name='password'
              rules={passwordValidation}
              render={({ field }) => (
                <InputForm
                  className='fz-13'
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  placeholder='Пароль'
                  label='Пароль'
                  error={errors.password && errors.password.message}
                />
              )}
            />
          </div>
          <div className='mt-20 flex gap-x-20'>
            <Button type='submit'>Добавить сотрудника</Button>
            <Button
              className='btn cancel'
              onClick={() => navigate(`${ROUTES.EMPLOYEES}`)}
            >
              Отмена
            </Button>
          </div>
        </form>
      </Layout>
    </>
  );
};
