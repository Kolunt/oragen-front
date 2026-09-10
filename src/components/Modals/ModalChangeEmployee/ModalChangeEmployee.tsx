import React, { useEffect, useMemo } from 'react';
import {
  Button,
  InputForm,
  ISelectOption,
  Modal,
  PhoneInput,
  SelectForm,
} from 'ui-kit';
import { useModalsStore } from 'store/useModalsStore';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { IUpdateUserPayload } from 'api/userApi';
import { fullNameValidation } from 'validation/validation';
import { RoleTypeId } from 'api/rolesApi';
import { useUserStore } from 'store/useUserStore';
import { getFormatPhoneResponse } from 'utils/getFormatPhoneResponse';
import { useRolesStore } from 'store/useRolesStore';
import './ModalChangeEmployee.scss';

interface IChangeEmployeeForm {
  login: string;
  firstName: string;
  middleName: string;
  lastName: string;
  role: ISelectOption;
  phone: string;
}

export const ModalChangeEmployee = () => {
  const isShowModal = useModalsStore((state) => state.isChangeEmployee);
  const changeShowModal = useModalsStore((state) => state.handleChangeEmployee);
  const rolesData = useRolesStore((state) => state.roles);
  const getRoles = useRolesStore((state) => state.getRoles);
  const monitoredUserId = useUserStore((state) => state.monitoredUserId);
  const getMonitoredUser = useUserStore((state) => state.getMonitoredUser);
  const monitoredUser = useUserStore((state) => state.monitoredUser);
  const changeUser = useUserStore((state) => state.changeUser);

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IChangeEmployeeForm>({
    defaultValues: {
      login: '',
      firstName: '',
      middleName: '',
      lastName: '',
      role: { value: '', label: '' },
      phone: '',
    },
  });

  useEffect(() => {
    if (isShowModal && monitoredUserId) {
      getMonitoredUser(monitoredUserId);
      getRoles();
    }
  }, [isShowModal]);

  useEffect(() => {
    if (isShowModal && monitoredUser) {
      setValue('login', monitoredUser.name);
      setValue('firstName', monitoredUser.first_name || '');
      setValue('middleName', monitoredUser.middle_name || '');
      setValue('lastName', monitoredUser.last_name || '');
      setValue('phone', `${monitoredUser.phone}` || '');
      setValue('role', {
        value: `${monitoredUser.roles[0].id}`,
        label: monitoredUser.roles[0].name,
      });
    }
  }, [monitoredUser]);

  const roles: ISelectOption[] = useMemo(() => {
    return rolesData.map((role) => ({ value: `${role.id}`, label: role.name }));
  }, [rolesData]);

  const onSubmit: SubmitHandler<IChangeEmployeeForm> = (data) => {
    const payload: IUpdateUserPayload = {
      name: data.login,
      first_name: data.firstName,
      middle_name: data.middleName,
      last_name: data.lastName,
      role: +data.role.value as RoleTypeId,
      phone: getFormatPhoneResponse(data.phone),
    };

    changeUser(monitoredUserId as number, payload);
    changeShowModal(false);
    reset();
  };
  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalChangeEmployee'>
        <h3 className='ModalChangeEmployee__Header'>
          Сотрудник (Изменить данные)
        </h3>
        <form
          className='ModalChangeEmployee__Form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            control={control}
            name='role'
            render={({ field }) => (
              <SelectForm
                className='mb-10'
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={roles}
                label='Должность'
              />
            )}
          />
          <Controller
            control={control}
            name='login'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                className='mb-10'
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
            name='firstName'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                className='mb-10'
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
                className='mb-10'
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
                className='mb-10'
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Фамилия'
                label='Фамилия'
                error={errors.lastName && errors.lastName.message}
              />
            )}
          />
          <PhoneInput control={control} errors={errors} />
          <div className='ModalChangeEmployee__ButtonGroup'>
            <Button
              className='ButtonCancel'
              onClick={() => changeShowModal(false)}
            >
              Отмена
            </Button>
            <Button className='ButtonCreate' type='submit'>
              Изменить
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
