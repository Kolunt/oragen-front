import React, { useState } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Button, InputForm, ISelectOption, SelectForm, Title } from 'ui-kit';
import { Navigate, useNavigate } from 'react-router-dom';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useProjectsStore } from 'store/useProjectsStore';
import { ICreateProjectPayload } from 'api/projectsApi';
import { fullNameValidation } from 'validation/validation';
import { useUserStore } from 'store/useUserStore';
import './NewProjectPage.scss';
import { useDebounceSelect } from 'hooks/useDebounceSelect';
import { useSelectOptions } from 'hooks';
import { displayCheck } from 'utils';

interface INewProjectForm {
  name: string;
  watchers: ISelectOption[];
  description: string;
}

export const NewProjectPage = () => {
  const addProject = useProjectsStore((state) => state.addProject);
  const users = useUserStore((state) => state.users);
  const getUsers = useUserStore((state) => state.getUsers);
  const [inputWatchers, setInputWatchers] = useState<string>('');
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<INewProjectForm>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<INewProjectForm> = (data) => {
    const payload: ICreateProjectPayload = {
      name: data.name,
      description: data.description,
      watchers_list: data.watchers
        ? data.watchers.map((item) => +item.value)
        : [],
    };
    addProject(payload, () => navigate(ROUTES.PROJECTS));
    reset();
  };

  const onCancel = () => {
    reset();
    navigate(ROUTES.PROJECTS);
  };

  useDebounceSelect(inputWatchers, getUsers);
  const watchers = useSelectOptions(users, 'id', 'name');

  if (!displayCheck(SideMenuTypes.PROJECTS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='NewProjectPage'>
      <Layout>
        <div className='NewProjectPage__Header'>
          <Title>Новый проект</Title>
        </div>

        <form className='ContactsPageForm' onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name='name'
            rules={fullNameValidation}
            render={({ field }) => (
              <InputForm
                className='CustomInput'
                value={field.value}
                onChange={(e) => field.onChange(e)}
                placeholder='Укажите название проекта'
                label='Название проекта'
                error={errors.name && errors.name.message}
              />
            )}
          />

          <Controller
            control={control}
            name='watchers'
            render={({ field }) => (
              <SelectForm
                iconType='search'
                className='CustomSelect'
                inputValue={inputWatchers}
                onInputChange={setInputWatchers}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={watchers}
                label='Участники'
                isMulti={true}
                isOptionDisabled={!inputWatchers.length}
                сlearable={true}
              />
            )}
          />

          <div className='TextAreaWrapper'>
            <label className='Label'>Описание</label>
            <Controller
              control={control}
              name='description'
              rules={fullNameValidation}
              render={({ field }) => (
                <textarea
                  className={
                    errors.description ? 'InputField Error' : 'InputField'
                  }
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                  placeholder='Обязательное поле'
                />
              )}
            />
          </div>

          <div className='Buttons'>
            <Button type='submit'>Создать проект</Button>

            <Button className='ButtonCancel' onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </form>
      </Layout>
    </div>
  );
};
