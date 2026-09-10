import React, { useState } from 'react';
import { useTasksStore } from 'store/useTasksStore';
import { useUserStore } from 'store/useUserStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, InputForm, ISelectOption, SelectForm, Title } from 'ui-kit';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { ICreateTaskPayload } from 'api/tasksApi';
import { Layout } from 'components/Layout/Layout';
import { dateValidation, fullNameValidation } from 'validation/validation';
import { useProjectsStore } from 'store/useProjectsStore';
import { useDebounceSelect, useSelectOptions } from 'hooks';
import './NewProjectTaskPage.scss';
import { disabledDateRangePicker, displayCheck } from 'utils';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

interface INewProjectTaskForm {
  name: string;
  description: string;
  performer: ISelectOption;
  watcher: ISelectOption[];
  startedDate: Date;
  finishedDate: Date;
  date: any;
}

export const NewProjectTaskPage = () => {
  const addTask = useTasksStore((state) => state.addTask);
  const getUsers = useUserStore((state) => state.getUsers);
  const users = useUserStore((state) => state.users);
  const [inputPerformer, setInputPerformer] = useState<string>('');
  const [inputWatchers, setInputWatchers] = useState<string>('');
  const monitoredProjectId = useProjectsStore(
    (state) => state.monitoredProjectId
  );
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  const navigate = useNavigate();
  /*  const {
    fileNames,
    handleDragDropEvent,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();*/
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    getValues,
  } = useForm<INewProjectTaskForm>({
    defaultValues: {
      name: '',
      description: '',
      performer: undefined,
      watcher: [],
      startedDate: undefined,
      finishedDate: undefined,
    },
  });

  // const inputRef = useRef<HTMLInputElement | null>(null);

  useDebounceSelect(inputPerformer, getUsers);
  useDebounceSelect(inputWatchers, getUsers);
  const watchers = useSelectOptions(users, 'id', 'name');

  const backTasksPage = () => {
    navigate(ROUTES.TASKS);
  };

  const onSubmit: SubmitHandler<INewProjectTaskForm> = (data) => {
    const payload: ICreateTaskPayload = {
      performer_id: +data.performer.value,
      parent_project_id: monitoredProjectId,
      name: data.name,
      description: data.description,
      started_at: data.date[0].toISOString(),
      finished_at: data.date[1].toISOString(),
      watchers_list: data.watcher
        ? data.watcher.map((item) => +item.value)
        : [],
    };
    addTask(payload, () => navigate(ROUTES.PROJECT_INFO));
    reset();
  };

  /*const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const formData = createFormData();

      /!*   try {
        axios.post('https://some-api.com', formData, {
          // 'content-type': 'multipart/form-data',
        });
      } catch (error) {
        console.error('Failed to submit files.');
      }*!/
    };*/

  if (!displayCheck(SideMenuTypes.PROJECTS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='NewTaskPage'>
      <Layout>
        <div className='NewTaskPage__Header'>
          <Title>Новая проектная задача</Title>
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
                label='Тема'
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
                className='CustomSelect'
                iconType={'search'}
                inputValue={inputPerformer}
                onInputChange={setInputPerformer}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={watchers}
                label='Исполнитель'
                isOptionDisabled={!inputPerformer.length}
                error={errors.performer && errors.performer.message}
                сlearable={true}
              />
            )}
          />

          <Controller
            control={control}
            name='watcher'
            render={({ field }) => (
              <SelectForm
                className='CustomSelect'
                iconType={'search'}
                inputValue={inputWatchers}
                onInputChange={setInputWatchers}
                value={field.value}
                onChange={(e) => field.onChange(e)}
                options={watchers}
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

            <Button className='ButtonCancel' onClick={backTasksPage}>
              Отмена
            </Button>
          </div>
        </form>
      </Layout>
    </div>
  );
};
