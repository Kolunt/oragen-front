import React, { useEffect, useState } from 'react';
import { ITab, SearchForm, Tabs, Title } from 'ui-kit';
import { Navigate, useNavigate } from 'react-router-dom';
import { useProjectsStore } from 'store/useProjectsStore';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { Layout } from 'components/Layout/Layout';
import { IconButtonAdd } from 'ui-kit/Button/IconButtonAdd/IconButtonAdd';
import { ListProjects } from 'pages/ProjectsPage/components';
import { useDebounceSelect } from 'hooks';
import { displayCheck } from 'utils';
import { useUserStore } from 'store/useUserStore';
import './ProjectsPage.scss';

const tabsTypeProjects: ITab[] = [
  { id: '1', label: 'Задачи' },
  { id: '2', label: 'Проекты' },
];

export const ProjectsPage = () => {
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  const projects = useProjectsStore((state) => state.projects);
  const getProjects = useProjectsStore((state) => state.getProjects);
  const setCurrentPage = useProjectsStore((state) => state.setCurrentPage);
  const pageSize = useProjectsStore((state) => state.pageSize);
  const currentPage = useProjectsStore((state) => state.currentPage);
  const [selectedTaskTypeId, setSelectedTaskTypeId] = useState(
    tabsTypeProjects[1].id
  );
  const searchField = useProjectsStore((state) => state.searchField);
  const setSearchField = useProjectsStore((state) => state.setSearchField);
  const sorting = useProjectsStore((state) => state.sorting);
  const [inputSearch, setInputSearch] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    getProjects();
  }, [currentPage, pageSize, searchField, sorting.orderBy, sorting.order]);

  const handleTabTaskType = (id: string | number) => {
    setSelectedTaskTypeId(id);
    if (+id === 1) {
      navigate(ROUTES.TASKS);
    }
  };

  const onChangeSearch = (search: string) => {
    setInputSearch(search);
    setCurrentPage(1);
  };

  useDebounceSelect(inputSearch, setSearchField, true);

  if (!displayCheck(SideMenuTypes.PROJECTS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='ProjectsPage h-full'>
      <Layout>
        <div className='ProjectsPage__Header'>
          <Title>Проекты</Title>
          <span className='TasksCount'>{projects.length}</span>
          <IconButtonAdd
            className={'CustomButtonAdd'}
            onClick={() => navigate(ROUTES.NEW_PROJECT)}
          />
        </div>

        <div className='FilterTasks'>
          <Tabs
            className='CustomTab'
            selectedId={selectedTaskTypeId}
            tabs={tabsTypeProjects}
            onClick={handleTabTaskType}
          />

          <SearchForm
            className='CustomSearchForm'
            placeholder='Поиск по задачам'
            value={inputSearch}
            onChangeText={(value) => onChangeSearch(value)}
          />
        </div>

        <ListProjects />
      </Layout>
    </div>
  );
};
