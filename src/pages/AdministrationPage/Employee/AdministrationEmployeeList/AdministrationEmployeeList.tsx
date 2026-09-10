import React, { useEffect } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Title } from 'ui-kit';
import { ListEmployees } from './ListEmployees/ListEmployees';
import { useUserStore } from 'store/useUserStore';
import SearchForm from './SearchForm/SearchForm';
import { ModalChangeEmployee } from 'components/Modals/ModalChangeEmployee/ModalChangeEmployee';
import { displayCheck } from 'utils';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { Navigate } from 'react-router-dom';

export const AdministrationEmployeeList = () => {
  const getUsers = useUserStore((state) => state.getUsers);
  const sorting = useUserStore((state) => state.sorting);
  const currentPage = useUserStore((state) => state.currentPage);
  const pageSize = useUserStore((state) => state.pageSize);
  const search = useUserStore((state) => state.search);
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;

  useEffect(() => {
    getUsers();
  }, [sorting.order, sorting.orderBy, currentPage, pageSize, search]);

  if (!displayCheck(SideMenuTypes.ADMIN, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <>
      <Layout>
        <Title className='mb-20'>Администрирование: Сотрудники</Title>
        <div className='flex gap-x-40 h-full hidden'>
          <ListEmployees />
          <SearchForm />
        </div>
      </Layout>
      <ModalChangeEmployee />
    </>
  );
};
