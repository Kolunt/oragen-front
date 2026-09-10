import React, { useRef, useState } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Button, InputForm, ISelectOption, SelectForm, Title } from 'ui-kit';
import { Navigate, useNavigate } from 'react-router-dom';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTasksStore } from 'store/useTasksStore';
import { ICreateTaskPayload } from 'api/tasksApi';
import { dateValidation, fullNameValidation } from 'validation/validation';
import { useUserStore } from 'store/useUserStore';
import { useSelectOptions } from 'hooks';
import { DatePicker } from 'antd';
import { disabledDateRangePicker, displayCheck } from 'utils';
import { useDebounceSelect } from 'hooks/useDebounceSelect';
import './NewTaskPage.scss';

const { RangePicker } = DatePicker;

interface INewTaskForm {
  name: string;
  description: string;
  performer: ISelectOption;
  watchers: ISelectOption[];
  startedDate: Date;
  finishedDate: Date;
  date: any;
}

export const NewTaskPage = () => {
  const addTask = useTasksStore((state) => state.addTask);
  const getUsers = useUserStore((state) => state.getUsers);
  const users = useUserStore((state) => state.users);
  const [inputPerformer, setInputPerformer] = useState<string>('');
  const [inputWatchers, setInputWatchers] = useState<string>('');
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  const navigate = useNavigate();

  /*  const { fileNames, handleDragDropEvent, setFiles, removeFile } =
    useFileUpload();*/
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<INewTaskForm>({
    defaultValues: {
      name: '',
      description: '',
      performer: undefined,
      watchers: [],
    },
  });

  const inputRef = useRef<HTMLInputElement | null>(null);

  useDebounceSelect(inputPerformer, getUsers);
  useDebounceSelect(inputWatchers, getUsers);

  const performers = useSelectOptions(users, 'id', 'name');

  const onSubmit: SubmitHandler<INewTaskForm> = async (data) => {
    const payload: ICreateTaskPayload = {
      performer_id: +data.performer.value,
      name: data.name,
      description: data.description,
      started_at: data.date[0].toISOString(),
      finished_at: data.date[1].toISOString(),
      watchers_list: data.watchers
        ? data.watchers.map((item) => +item.value)
        : [],
    };
    addTask(payload, () => navigate(ROUTES.TASKS));
    reset();
  };

  const onCancel = () => {
    reset();
    navigate(ROUTES.TASKS);
  };

  if (!displayCheck(SideMenuTypes.TASKS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='NewTaskPage h-full'>
      <Layout>
        <div className='NewTaskPage__Header'>
          <Title>Новая задача</Title>
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
                placeholder='Укажите тему задачи'
                label='Название задачи'
                error={errors.name && errors.name.message}
              />
            )}
          />
          <Controller
            control={control}
            name='performer'
            rules={fullNameValidation}
            render={({ field }) => (
              <SelectForm
                iconType='search'
                className='CustomSelect'
                inputValue={inputPerformer}
                onInputChange={setInputPerformer}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={performers}
                label='Исполнитель'
                isOptionDisabled={!inputPerformer.length}
                error={errors.performer && errors.performer.message}
                сlearable={true}
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
                options={performers}
                label='Участники'
                isOptionDisabled={!inputWatchers.length}
                isMulti={true}
              />
            )}
          />

          <Controller
            control={control}
            name='date'
            rules={dateValidation}
            render={({ field }) => (
              <div className={'range-picker w-500'}>
                <label>Выбор диапазона времени</label>
                <RangePicker
                  onChange={(e) => field.onChange(e)}
                  format={'DD.MM.YYYY HH:mm'}
                  showTime={{ format: 'HH:mm', minuteStep: 5 }}
                  superNextIcon={false}
                  superPrevIcon={false}
                  disabledDate={disabledDateRangePicker}
                  status={errors.date && 'error'}
                />
              </div>
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

          {/*<div className='FileUpload'>
            <div className='FileUpload__Label'>
              <p className='Text'>Перетащите файлы или перейдите к</p>
              <button
                className='CustomButton'
                onClick={() => inputRef.current?.click()}
              >
                выбору файла
              </button>
            </div>

            <div className='FileUpload__Content'>
              <div
                className='Dropzone'
                // @ts-ignore
                onDragEnter={handleDragDropEvent}
                // @ts-ignore
                onDragOver={handleDragDropEvent}
                onDrop={(e) => {
                  // @ts-ignore
                  handleDragDropEvent(e);
                  // @ts-ignore
                  setFiles(e, 'a');
                }}
              >
                <input
                  ref={inputRef}
                  type='file'
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    // @ts-ignore
                    setFiles(e, 'a');
                    // @ts-ignore
                    inputRef.current.value = null;
                  }}
                />
                {fileNames.map((name) => (
                  <div key={v1()} className='UploadedFilesItem'>
                    <Icon type='TasksPaperclip' />
                    <span>{name}</span>
                    <Icon
                      className='CustomIconDelete'
                      type='DeleteUser'
                      onClick={() => removeFile(name)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>*/}

          <div className='Buttons'>
            <Button type='submit'>Создать задачу</Button>

            <Button className='ButtonCancel' onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </form>
      </Layout>
    </div>
  );
};
