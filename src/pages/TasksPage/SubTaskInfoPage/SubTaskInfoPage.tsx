import React, { useEffect, useMemo, useRef } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Avatar, Button, DatePickerTiming, SelectForm, Title } from 'ui-kit';
import AvatarImg from 'assets/img/header/avatar.jpg';
import useFileUpload from 'react-use-file-upload';
import { Navigate, useNavigate } from 'react-router-dom';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { ITask, useTasksStore } from 'store/useTasksStore';
import { Breadcrumbs } from 'ui-kit/Breadcrumbs/Breadcrumbs';
import dayjs from 'dayjs';
import { useSubTaskStore } from './useSubTaskStore';
import { options } from '../constant';
import './SubTaskInfoPage.scss';
import { displayCheck } from 'utils';
import { useUserStore } from 'store/useUserStore';

export const SubTaskInfoPage = () => {
  const setSubUpdatedTask = useSubTaskStore((state) => state.setSubUpdatedTask);
  const updatedSubTask = useSubTaskStore((state) => state.updatedSubTask);
  const monitoredSubTaskId = useTasksStore((state) => state.monitoredSubTaskId);
  const getMonitoredTask = useTasksStore((state) => state.getMonitoredTask);
  const changeTaskFinishedDate = useTasksStore(
    (state) => state.changeTaskFinishedDate
  );
  const changeTaskStatus = useTasksStore((state) => state.changeTaskStatus);
  const task = useTasksStore((state) => state.monitoredTask);
  const parentTask = useTasksStore((state) => state.parentTask);
  const setParentTask = useTasksStore((state) => state.setParentTask);
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  const navigate = useNavigate();

  const {
    fileNames,
    handleDragDropEvent,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (monitoredSubTaskId) {
      getMonitoredTask(monitoredSubTaskId);
      setSubUpdatedTask({});
    }
  }, [monitoredSubTaskId]);

  const handleChangeFinishDate = (date: Date | null) => {
    if (date) {
      setSubUpdatedTask({ ...updatedSubTask, finishedDate: date });
    }
  };

  const handleChangeTaskStatus = (status: any) => {
    setSubUpdatedTask({ ...updatedSubTask, taskStatus: status.value });
  };

  const onClickReady = () => {
    if (updatedSubTask.finishedDate && monitoredSubTaskId) {
      changeTaskFinishedDate({
        id: monitoredSubTaskId,
        finished_at: updatedSubTask.finishedDate,
      });
    }

    if (updatedSubTask.taskStatus && monitoredSubTaskId) {
      changeTaskStatus({
        id: monitoredSubTaskId,
        status: updatedSubTask.taskStatus,
      });
    }

    setParentTask({} as ITask);
    setSubUpdatedTask({});
    navigate(ROUTES.TASK_INFO);
  };

  const defaultTaskStatus = useMemo(() => {
    const condition = updatedSubTask.taskStatus
      ? updatedSubTask.taskStatus
      : task.status;
    return options.find(({ value }) => value === condition);
  }, [updatedSubTask.taskStatus, task.status]);

  if (!displayCheck(SideMenuTypes.TASKS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='SubTaskInfoPage'>
      <Layout>
        <div className='SubTaskInfoPage__Header'>
          <Breadcrumbs
            links={[
              { title: 'Задачи', callback: () => navigate(ROUTES.TASKS) },
              {
                title: `${parentTask.name}`,
                callback: () => navigate(ROUTES.TASK_INFO),
              },
              { title: `${task.name}` },
            ]}
          />
          <Title>{task.name}</Title>
        </div>
        <div className='SubTaskInfoPage__Content'>
          <div className='SubTaskInfo'>
            <div className='DatePickerWrapper'>
              <DatePickerTiming
                className='CustomDatePicker'
                label='Создано'
                value={dayjs(task.created_at).toDate()}
                changeValue={() => {}}
                timeIntervals={10}
                disabled={true}
              />
              <DatePickerTiming
                className='CustomDatePicker'
                label='Начать'
                value={dayjs(task.started_at).toDate()}
                changeValue={() => {}}
                timeIntervals={10}
                disabled={true}
              />
              <DatePickerTiming
                className='CustomDatePicker'
                label='Закончить'
                value={
                  updatedSubTask.finishedDate
                    ? dayjs(updatedSubTask.finishedDate).toDate()
                    : dayjs(task.finished_at).toDate()
                }
                changeValue={handleChangeFinishDate}
                timeIntervals={10}
                minDate={dayjs(task.started_at).toDate()}
              />
              <SelectForm
                className='CustomSelect'
                options={options}
                value={defaultTaskStatus}
                onChange={handleChangeTaskStatus}
                label='Статус'
              />
            </div>

            <div className='TextAreaWrapper'>
              <label className='Label'>Описание</label>
              <textarea
                className='InputField'
                value={task.description}
                onChange={() => {}}
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
              <Button onClick={onClickReady}>Готово</Button>
            </div>
          </div>

          <div className='Users'>
            <div className='User Accent'>
              <Avatar className='Avatar' image={AvatarImg} />
              <div className='UserInfo'>
                <h3>{task.creator?.name}</h3>
                <span>Создатель</span>
              </div>
            </div>
            <div className='User Accent'>
              <Avatar className='Avatar' image={AvatarImg} />
              <div className='UserInfo'>
                <h3>{task.performer?.name}</h3>
                <span>Исполнитель</span>
              </div>
            </div>
            {task.watchers_list?.map((watcher) => {
              return (
                <div key={watcher.id} className='User'>
                  <Avatar className='Avatar' image={AvatarImg} />
                  <div className='UserInfo'>
                    <h3>{watcher.name}</h3>
                    <span>Участник</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </div>
  );
};
