import React, { useEffect, useMemo, useRef } from 'react';
import {
  Avatar,
  Button,
  DatePickerTiming,
  Icon,
  Modal,
  SelectForm,
  Title,
} from 'ui-kit';
import dayjs from 'dayjs';
import { v1 } from 'uuid';
import AvatarImg from '../../../assets/img/header/avatar.jpg';
import { useTasksStore } from 'store/useTasksStore';
import { useModalsStore } from 'store/useModalsStore';
import { useNavigate } from 'react-router-dom';
import useFileUpload from 'react-use-file-upload';
import './ModalSubTaskInfo.scss';
import { options } from '../../../pages/TasksPage/constant';

export const ModalSubTaskInfo = () => {
  const isShowModal = useModalsStore((state) => state.isSubTaskInfo);
  const changeShowModal = useModalsStore((state) => state.handleSubTaskInfo);
  const updatedTask = useTasksStore((state) => state.updatedTask);
  const setUpdatedTask = useTasksStore((state) => state.setUpdatedTask);
  const monitoredSubTaskId = useTasksStore((state) => state.monitoredSubTaskId);
  const getMonitoredTask = useTasksStore((state) => state.getMonitoredTask);
  const changeTaskFinishedDate = useTasksStore(
    (state) => state.changeTaskFinishedDate
  );
  const changeTaskStatus = useTasksStore((state) => state.changeTaskStatus);
  const task = useTasksStore((state) => state.monitoredTask);
  const isSubTaskCreate = useTasksStore((state) => state.isSubTaskCreate);
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
    if (isShowModal && monitoredSubTaskId) {
      getMonitoredTask(monitoredSubTaskId);
    }
  }, [isShowModal]);

  useEffect(() => {
    if (monitoredSubTaskId && isSubTaskCreate) {
      getMonitoredTask(monitoredSubTaskId);
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

  const onClickReady = () => {
    if (updatedTask.finishedDate && monitoredSubTaskId) {
      changeTaskFinishedDate({
        id: monitoredSubTaskId,
        finished_at: updatedTask.finishedDate,
      });
    }

    if (updatedTask.taskStatus && monitoredSubTaskId) {
      changeTaskStatus({
        id: monitoredSubTaskId,
        status: updatedTask.taskStatus,
      });
    }

    setUpdatedTask({});
    changeShowModal(false);
  };

  const defaultTaskStatus = useMemo(() => {
    const condition = updatedTask.taskStatus
      ? updatedTask.taskStatus
      : task.status;
    return options.find(({ value }) => value === condition);
  }, [updatedTask.taskStatus, task.status]);

  return (
    <Modal visibility={isShowModal} changeVisibility={changeShowModal}>
      <div className='ModalSubTaskInfo'>
        <div className='ModalSubTaskInfo__Header'>
          <Title>Подзадача: {task.name}</Title>
        </div>

        <div className='ModalSubTaskInfo__Content'>
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
                label='Сделать до'
                value={
                  updatedTask.finishedDate
                    ? updatedTask.finishedDate
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

            <div className='FileUpload'>
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
      </div>
    </Modal>
  );
};
