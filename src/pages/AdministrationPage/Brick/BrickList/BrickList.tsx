import React, { useEffect } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Title } from 'ui-kit';
import { List } from './List/List';
import { SearchFormBricks } from './SearchFormBricks/SearchFormBricks';
import { useBrickStore } from 'store/useBrickStore';
import { displayCheck } from 'utils';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { Navigate } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';

export const BrickList = () => {
  const getBlocks = useBrickStore((state) => state.getBlocks);
  const currentPage = useBrickStore((state) => state.currentPage);
  const pageSize = useBrickStore((state) => state.pageSize);
  const search = useBrickStore((state) => state.search);
  const sorting = useBrickStore((state) => state.sorting);
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;

  useEffect(() => {
    getBlocks();
  }, [currentPage, pageSize, search, sorting.orderBy, sorting.order, search]);

  if (!displayCheck(SideMenuTypes.ADMIN, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <>
      <Layout>
        <Title className='mb-20'>Администрирование: Брики</Title>
        <div className='flex gap-x-40 h-full hidden'>
          <List />
          <SearchFormBricks />
        </div>
      </Layout>
    </>
  );
};
