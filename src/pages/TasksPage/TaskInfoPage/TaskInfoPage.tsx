import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Layout } from 'components/Layout/Layout';
import {
  Avatar,
  Button,
  DatePickerTiming,
  Icon,
  SelectForm,
  Title,
} from 'ui-kit';
import { ModalAddSubTask } from 'components/Modals';
import AvatarImg from 'assets/img/header/avatar.jpg';
import { v1 } from 'uuid';
import useFileUpload from 'react-use-file-upload';
import { Navigate, useNavigate } from 'react-router-dom';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { useTasksStore } from 'store/useTasksStore';
import { useModalsStore } from 'store/useModalsStore';
import { Breadcrumbs } from 'ui-kit/Breadcrumbs/Breadcrumbs';
import './TaskInfoPage.scss';
import dayjs from 'dayjs';
import { options } from '../constant';
import { updateTaskFinishedDate, updateTaskStatus } from 'api/tasksApi';
import { displayCheck } from 'utils';
import { useUserStore } from 'store/useUserStore';

export const TaskInfoPage = () => {
  const updatedTask = useTasksStore((state) => state.updatedTask);
  const setUpdatedTask = useTasksStore((state) => state.setUpdatedTask);
  const monitoredTaskId = useTasksStore((state) => state.monitoredTaskId);
  const setMonitoredSubTaskId = useTasksStore(
    (state) => state.setMonitoredSubTaskId
  );
  const getMonitoredTask = useTasksStore((state) => state.getMonitoredTask);
  const changeTaskFinishedDate = useTasksStore(
    (state) => state.changeTaskFinishedDate
  );
  const changeTaskStatus = useTasksStore((state) => state.changeTaskStatus);
  const task = useTasksStore((state) => state.monitoredTask);
  const changeShowModal = useModalsStore((state) => state.handleAddSubTask);
  const isSubTaskCreate = useTasksStore((state) => state.isSubTaskCreate);
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

  useEffect(() => {
    if (monitoredTaskId) {
      getMonitoredTask(monitoredTaskId);
      setUpdatedTask({});
    }
  }, [monitoredTaskId]);

  useEffect(() => {
    if (monitoredTaskId && isSubTaskCreate) {
      getMonitoredTask(monitoredTaskId);
    }
  }, [isSubTaskCreate]);

  const handleChangeFinishDate = (date: Date | null) => {
    if (date) {
      setUpdatedTask({ ...updatedTask, finishedDate: date });
    }
  };

  const handleChangeTaskStatus = (status: any) => {
    setUpdatedTask({ ...updatedTask, taskStatus: status.value });
  };

  const onClickReady = useCallback(async () => {
    if (updatedTask.finishedDate && monitoredTaskId) {
      try {
        await updateTaskFinishedDate({
          id: monitoredTaskId,
          finished_at: updatedTask.finishedDate,
        });
        navigate(ROUTES.TASKS);
      } catch (e) {
        console.error(e);
      }
      // changeTaskFinishedDate({
      //   id: monitoredTaskId,
      //   finished_at: updatedTask.finishedDate,
      // });
    }
    if (updatedTask.taskStatus && monitoredTaskId) {
      try {
        await updateTaskStatus({
          id: monitoredTaskId,
          status: updatedTask.taskStatus,
        });
        navigate(ROUTES.TASKS);
      } catch (e) {
        console.error(e);
      }
      // changeTaskStatus({ id: monitoredTaskId, status: updatedTask.taskStatus });
    }
    setUpdatedTask({});
  }, [updatedTask, monitoredTaskId]);

  const defaultTaskStatus = useMemo(() => {
    const condition = updatedTask.taskStatus
      ? updatedTask.taskStatus
      : task.status;
    return options.find(({ value }) => value === condition);
  }, [updatedTask.taskStatus, task.status]);

  const handleShowSubTaskInfo = (id: number) => {
    setMonitoredSubTaskId(id);
    setParentTask(task);
    navigate(ROUTES.SUB_TASK_INFO);
  };

  if (!displayCheck(SideMenuTypes.TASKS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='TaskInfoPage'>
      <Layout>
        <div className='TaskInfoPage__Header'>
          <Breadcrumbs
            links={[
              { title: 'Задачи', callback: () => navigate(ROUTES.TASKS) },
              { title: `${task.name}` },
            ]}
          />
          <Title>{task.name}</Title>
        </div>
        <div className='TaskInfoPage__Content'>
          <div className='ContactsPageForm'>
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
                  updatedTask.finishedDate
                    ? dayjs(updatedTask.finishedDate).toDate()
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

            <div className='SubTasks'>
              <div className='SubTasks__Header'>
                <h4 className='SubTasks__Title'>Подзадачи</h4>
                <Icon
                  className='CustomIcon'
                  type={'TasksAddSquare'}
                  onClick={() => changeShowModal(true)}
                />
              </div>

              <ul className='SubTaskList'>
                {task.sub_tasks?.map((subTask) => {
                  return (
                    <li key={subTask.id} className='SubTask'>
                      <Icon className='CustomIconCheck' type='MediaCheck' />
                      <span onClick={() => handleShowSubTaskInfo(subTask.id)}>
                        {subTask.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

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
      <ModalAddSubTask />
    </div>
  );
};
