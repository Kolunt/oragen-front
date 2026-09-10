import React, { FC, memo } from 'react';
import { IProject, useProjectsStore } from 'store/useProjectsStore';
import { Avatar } from 'ui-kit';
import AvatarImg from 'assets/img/tasks/avatar.jpg';
import dayjs from 'dayjs';
import { DateFormats, ROUTES } from 'enums';
import { useNavigate } from 'react-router-dom';
import './ListItemProject.scss';

interface IListItemProject {
  project: IProject;
}

export const ListItemProject: FC<IListItemProject> = memo((props) => {
  const { project } = props;
  const setMonitoredTaskId = useProjectsStore(
    (state) => state.setMonitoredProjectId
  );
  const navigate = useNavigate();

  const goToProjectInfo = (id: number) => {
    setMonitoredTaskId(id);
    navigate(ROUTES.PROJECT_INFO);
  };

  return (
    <div key={project.id} className='ListItemProject'>
      <div className='Cell'>
        <h4 className='Title' onClick={() => goToProjectInfo(project.id)}>
          {project.name}
        </h4>
        <span className='SubTitle'>{project.description}</span>
      </div>

      <div className='Cell'>
        <div className='AuthorBlock'>
          <Avatar className='CustomAvatarSmall' image={AvatarImg} />
          {/*          <PopupForm
            trigger={<span className='Author'>{project.creator.name}</span>}
          />*/}
          <span className='Author'>{project.creator.name}</span>
        </div>
      </div>

      <div className='Cell'>
        <span className='CreationDate'>
          {dayjs(project.created_at).format(DateFormats.FULL_DATE_FORMAT)}
        </span>
      </div>
    </div>
  );
});
