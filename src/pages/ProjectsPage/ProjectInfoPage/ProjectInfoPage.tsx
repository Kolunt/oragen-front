import React, { useEffect } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Avatar, Button, Icon, ISelectOption, Title } from 'ui-kit';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import AvatarImg from 'assets/img/header/avatar.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import { useProjectsStore } from 'store/useProjectsStore';
import { useTasksStore } from 'store/useTasksStore';
import './ProjectInfoPage.scss';
import { displayCheck } from 'utils';
import { useUserStore } from 'store/useUserStore';

const options: ISelectOption[] = [
  { value: 'In progress', label: 'In progress' },
  { value: 'Todo', label: 'Todo' },
  { value: 'Is Done', label: 'Is Done' },
];

export const ProjectInfoPage = () => {
  const monitoredProjectId = useProjectsStore(
    (state) => state.monitoredProjectId
  );
  const getMonitoredProject = useProjectsStore(
    (state) => state.getMonitoredProject
  );
  const setMonitoredTaskId = useTasksStore((state) => state.setMonitoredTaskId);
  const project = useProjectsStore((state) => state.monitoredProject);
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  const navigate = useNavigate();

  useEffect(() => {
    if (monitoredProjectId) {
      getMonitoredProject(monitoredProjectId);
    }
  }, [monitoredProjectId]);

  const goToTaskInfo = (id: number) => {
    setMonitoredTaskId(id);
    navigate(ROUTES.TASK_INFO);
  };

  if (!displayCheck(SideMenuTypes.PROJECTS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='ProjectInfoPage'>
      <Layout>
        <div className='ProjectInfoPage__Header'>
          <Title>Проект: {project.name}</Title>
        </div>

        <div className='ProjectInfoPage__Content'>
          <div className='ContactsPageForm'>
            {/*<div className='DatePickerWrapper'>
              <DatePickerTiming
                className='CustomDatePicker'
                label='Создано'
                value={dayjs(project.created_at).toDate()}
                changeValue={() => {}}
                timeIntervals={10}
                disabled={true}
              />
              <DatePickerTiming
                className='CustomDatePicker'
                label='Начать'
                value={dayjs(project.started_at).toDate()}
                changeValue={() => {}}
                timeIntervals={10}
                disabled={true}
              />
              <DatePickerTiming
                className='CustomDatePicker'
                label='Сделать до'
                value={dayjs(project.finished_at).toDate()}
                changeValue={() => {}}
                timeIntervals={10}
                minDate={dayjs(project.started_at).toDate()}
                disabled={true}
              />
              <SelectForm
                className='CustomSelect'
                options={options}
                label='Статус'
              />
            </div>*/}

            <div className='TextAreaWrapper'>
              <label className='Label'>Описание</label>
              <textarea
                className='InputField'
                value={project.description}
                onChange={() => {}}
              />
            </div>

            <div className='SubTasks'>
              <div className='SubTasks__Header'>
                <h4 className='SubTasks__Title'>Проектные задачи</h4>
                <Icon
                  className='CustomIcon'
                  type={'TasksAddSquare'}
                  onClick={() => navigate(ROUTES.NEW_PROJECT_TASK)}
                />
              </div>

              <ul className='SubTaskList'>
                {project.tasks_list_full_info?.map((task) => {
                  return (
                    <li
                      key={task.id}
                      className='SubTask'
                      onClick={() => goToTaskInfo(task.id)}
                    >
                      <Icon className='CustomIconCheck' type='MediaCheck' />
                      <span>{task.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className='Buttons'>
              <Button onClick={() => navigate(ROUTES.PROJECTS)}>Готово</Button>
            </div>
          </div>

          <div className='Users'>
            <div className='User Accent'>
              <Avatar className='Avatar' image={AvatarImg} />
              <div className='UserInfo'>
                <h3>{project.creator?.name}</h3>
                <span>Создатель</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
