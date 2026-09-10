import React, { useEffect, useState } from 'react';
import { Layout } from 'components/Layout/Layout';
import { ITab, SearchForm, Tabs, Title } from 'ui-kit';
import { IconButtonAdd } from 'ui-kit/Button/IconButtonAdd/IconButtonAdd';
import { ModalTaskSelection } from 'components/Modals/ModalTaskSelection/ModalTaskSelection';
import { useModalsStore } from 'store/useModalsStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTES, SideMenuTypes } from 'enums';
import { useTasksStore } from 'store/useTasksStore';
import { ListTasks } from 'pages/TasksPage/components';
import { useUserStore } from 'store/useUserStore';
import { displayCheck } from 'utils';
import { useDebounceSelect } from 'hooks';
import './TasksPage.scss';

const TASK_PERFORMED = 'performed';
const TASK_WATCHED = 'watched';
const TASK_CREATED = 'created';

const tabsFilterTask: ITab[] = [
  { id: '1', label: 'Входящие', icon: 'TasksSignIn' },
  { id: '2', label: 'Участвую', icon: 'TasksUserAdd' },
  { id: '3', label: 'Исходящие', icon: 'TasksSignOut' },
];

const tabsTypeTask: ITab[] = [
  { id: '1', label: 'Задачи' },
  { id: '2', label: 'Проекты' },
];

export const TasksPage = () => {
  const myRole = useUserStore((state) => state.me.roles[0].name);
  const tasks = useTasksStore((state) => state.tasks);
  const getTasks = useTasksStore((state) => state.getTasks);
  const setCurrentPage = useTasksStore((state) => state.setCurrentPage);
  const pageSize = useTasksStore((state) => state.pageSize);
  const currentPage = useTasksStore((state) => state.currentPage);
  const taskMode = useTasksStore((state) => state.taskMode);
  const setTaskMode = useTasksStore((state) => state.setTaskMode);
  const sorting = useTasksStore((state) => state.sorting);
  const searchField = useTasksStore((state) => state.searchField);
  const setSearchField = useTasksStore((state) => state.setSearchField);
  const [selectedTaskTypeId, setSelectedTaskTypeId] = useState(
    tabsTypeTask[0].id
  );
  const [selectedTaskFilterId, setSelectedTaskFilterId] = useState(
    tabsFilterTask[0].id
  );
  const [inputSearch, setInputSearch] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
  }, [
    currentPage,
    pageSize,
    taskMode,
    sorting.order,
    sorting.orderBy,
    searchField,
  ]);

  useEffect(() => {
    if (taskMode === TASK_PERFORMED) {
      setSelectedTaskFilterId('1');
    }
    if (taskMode === TASK_WATCHED) {
      setSelectedTaskFilterId('2');
    }
    if (taskMode === TASK_CREATED) {
      setSelectedTaskFilterId('3');
    }
  }, [taskMode]);

  const onChangeSearch = (search: string) => {
    setInputSearch(search);
    setCurrentPage(1);
  };

  useDebounceSelect(inputSearch, setSearchField, true);

  const handleTabTaskFilter = (id: string | number) => {
    setSelectedTaskFilterId(id);
    setCurrentPage(1);
    if (+id === 1) {
      setTaskMode(TASK_PERFORMED);
    }
    if (+id === 2) {
      setTaskMode(TASK_WATCHED);
    }
    if (+id === 3) {
      setTaskMode(TASK_CREATED);
    }
  };

  const handleTabTaskType = (id: string | number) => {
    setSelectedTaskTypeId(id);
    if (+id === 2) {
      navigate(ROUTES.PROJECTS);
    }
  };

  if (!displayCheck(SideMenuTypes.TASKS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='TasksPage h-full'>
      <Layout>
        <div className='TasksPage__Header'>
          <Title>Задачи</Title>
          <span className='TasksCount'>{tasks.length}</span>
          <IconButtonAdd
            className={'CustomButtonAdd'}
            onClick={() => navigate(ROUTES.NEW_TASK)}
          />
        </div>

        <div className='FilterTasks'>
          <Tabs
            className='CustomTab'
            selectedId={selectedTaskTypeId}
            tabs={tabsTypeTask}
            onClick={handleTabTaskType}
          />

          <Tabs
            className='CustomTab'
            selectedId={selectedTaskFilterId}
            tabs={tabsFilterTask}
            onClick={handleTabTaskFilter}
          />

          <SearchForm
            className='CustomSearchForm'
            placeholder='Поиск по задачам'
            value={inputSearch}
            onChangeText={(value) => onChangeSearch(value)}
          />
        </div>
        <ListTasks />
      </Layout>
    </div>
  );
};
