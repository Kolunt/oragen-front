import React, { FC } from 'react';
import { Avatar, Icon, PopupForm } from 'ui-kit';
import dayjs from 'dayjs';
import { DateFormats, ROUTES, TaskStatusTypes, TaskStatusTypesRu } from 'enums';
import AvatarImg from 'assets/img/tasks/avatar.jpg';
import { ITask, useTasksStore } from 'store/useTasksStore';
import { useNavigate } from 'react-router-dom';
import './ListItemTask.scss';

interface IListItemTask {
  task: ITask;
}

export const ListItemTask: FC<IListItemTask> = (props) => {
  const {
    task: {
      status,
      name,
      description,
      started_at,
      created_at,
      creator,
      id,
      finished_at,
    },
  } = props;
  const setMonitoredTaskId = useTasksStore((state) => state.setMonitoredTaskId);
  const navigate = useNavigate();

  let statusTask, colorStyle;

  switch (status) {
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

  const goToTaskInfo = (id: number) => {
    setMonitoredTaskId(id);
    navigate(ROUTES.TASK_INFO);
  };
  return (
    <div className='ListItemTask'>
      <div className='Cell'>
        <h4 className='Title' onClick={() => goToTaskInfo(id)}>
          {name}
        </h4>
        <span className='SubTitle'>{description}</span>
      </div>

      <div className='Cell'>
        <div className='flex items-center'>
          <div className={`Circle ${colorStyle}`} />
          <span>{statusTask}</span>
        </div>
      </div>

      <div className='Cell'>
        <div className='Date'>
          <Icon type={'TasksTimeFast'} />
          <span>{dayjs(started_at).format(DateFormats.FULL_DATE_FORMAT)}</span>
        </div>
      </div>

      <div className='Cell'>
        <div className='Date'>
          <Icon type={'TasksTimeFast'} />
          <span>{dayjs(finished_at).format(DateFormats.FULL_DATE_FORMAT)}</span>
        </div>
      </div>

      <div className='Cell'>
        <div className='AuthorBlock'>
          <Avatar className='CustomAvatarSmall' image={AvatarImg} />
          {/*<PopupForm trigger={<span className='Author'>{creator.name}</span>} />*/}
          <span className='Author'>{creator.name}</span>
        </div>
      </div>

      <div className='Cell'>
        <span className='CreationDate'>
          {dayjs(created_at).format(DateFormats.FULL_DATE_FORMAT)}
        </span>
      </div>
    </div>
  );
};
