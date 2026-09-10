import React, { useMemo } from 'react';
import '../styles.scss';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { DateFormats, ROUTES } from 'enums';
import { ITask, useTasksStore } from 'store/useTasksStore';
import { TaskStatusTypes, TaskStatusTypesRu } from 'enums/TaskStatusTypes';
import { Icon } from 'ui-kit';

interface INewTask {
  task: ITask;
}

export const NewTask = ({ task }: INewTask) => {
  const navigate = useNavigate();
  const setMonitoredTaskId = useTasksStore((state) => state.setMonitoredTaskId);

  let statusTask, colorStyle;

  switch (task?.status) {
    case TaskStatusTypes.INPROGRESS:
      statusTask = TaskStatusTypesRu.INPROGRESS;
      colorStyle = 'Circle--completed';
      break;
    case TaskStatusTypes.TODO:
      statusTask = TaskStatusTypesRu.TODO;
      colorStyle = 'Circle--todo';
      break;
    case TaskStatusTypes.CANCELLED:
      colorStyle = 'Circle--rejected';
      statusTask = TaskStatusTypesRu.CANCELLED;
      break;
    case TaskStatusTypes.DONE:
      statusTask = TaskStatusTypesRu.DONE;
      colorStyle = '';
      break;
  }

  const goToTaskInfo = () => {
    setMonitoredTaskId(task?.id);
    navigate(ROUTES.TASK_INFO);
  };
  return (
    <div className='newItem' onClick={() => goToTaskInfo()}>
      <div className='flex items-center'>
        <div className='icon'>
          <Icon type='Tasks' />
        </div>
        <div>
          <div className='flex items-center'>
            <div className='TypeName'>Задача</div>
            <span className=''>
              от {dayjs(task?.created_at).format(DateFormats.APP_DATE_FORMAT)}
            </span>
          </div>
          <div className='color-tertiary-l3'>
            создана {dayjs(task?.created_at).locale('ru').fromNow()}
          </div>
        </div>
      </div>
      <div className='color-tertiary-l3'>
        <div className='flex items-center'>
          <div className={`Circle ${colorStyle}`} />
          <span>{statusTask}</span>
        </div>
      </div>
      <div className='fw-600'>{task?.name}</div>
    </div>
  );
};
