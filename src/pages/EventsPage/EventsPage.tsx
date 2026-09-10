import React, { useEffect, useState } from 'react';
import { ModalAddEvent } from 'components';
import { Layout } from 'components/Layout/Layout';
import { useModalsStore } from 'store/useModalsStore';
import { Button, ITab, SearchForm, Title } from 'ui-kit';
import { ListEvents } from './ListEvents/ListEvents';
import { useEventsStore } from 'store/useEventsStore';
import { useUserStore } from 'store/useUserStore';
import { displayCheck } from 'utils';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { Navigate } from 'react-router-dom';
import { useDebounceSelect } from 'hooks';
import './EventsPage.scss';

const tabs: ITab[] = [
  { id: '1', label: 'Все' },
  { id: '2', label: 'Видеоконференции' },
  { id: '3', label: 'Круглые столы' },
  { id: '4', label: 'Онлайн-ординаторские' },
];

export const EventsPage = () => {
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  const showModal = useModalsStore((state) => state.handleEvent);
  const search = useEventsStore((state) => state.search);
  const setSearch = useEventsStore((state) => state.setSearch);
  const getEvents = useEventsStore((state) => state.getEvents);
  const currentPage = useEventsStore((state) => state.currentPage);
  const pageSize = useEventsStore((state) => state.pageSize);
  const setCurrentPage = useEventsStore((state) => state.setCurrentPage);
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);
  const [inputSearch, setInputSearch] = useState<string>('');

  const handleTabClick = (id: string | number) => {
    setSelectedTabId(id);
  };

  useEffect(() => {
    getEvents();
  }, [search, currentPage, pageSize]);

  const handleResetParams = () => {
    setSearch('');
    setInputSearch('');
  };

  const onChangeSearch = (search: string) => {
    // setInputSearch({ ...filtration, search });
    setInputSearch(search);
    setCurrentPage(1);
  };

  useDebounceSelect(inputSearch, setSearch, true);

  if (!displayCheck(SideMenuTypes.EVENTS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='EventsPage h-full'>
      <Layout>
        <div className='EventsPage__Header'>
          <Title>Мероприятия</Title>
          {/*<Tabs*/}
          {/*  selectedId={selectedTabId}*/}
          {/*  tabs={tabs}*/}
          {/*  onClick={handleTabClick}*/}
          {/*/>*/}
        </div>
        <div className='EventsPage__Content gap-x-40 hidden'>
          <ListEvents />
          <div className='EventsFormSearch__Wrapper'>
            <div className='EventsFormSearch'>
              <SearchForm
                className='SearchStyle'
                value={inputSearch}
                onChangeText={(value) => onChangeSearch(value)}
              />
              <Button className='btn reset' onClick={handleResetParams}>
                Сброс параметров
              </Button>
            </div>
            <div className='flex justify-center'>
              <Button
                className='w-full mr-20 ml-20'
                onClick={() => showModal(true)}
              >
                Добавить мероприятие
              </Button>
            </div>
          </div>
        </div>
      </Layout>

      <ModalAddEvent />
    </div>
  );
};
