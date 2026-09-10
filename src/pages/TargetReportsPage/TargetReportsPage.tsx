import React from 'react';
import { Layout } from 'components/Layout/Layout';
import { Title } from 'ui-kit';
import { ListTargetReports } from './components/ListTargetReports';
import { useUserStore } from 'store/useUserStore';
import { displayCheck } from 'utils';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { Navigate } from 'react-router-dom';
import './TargetReportsPage.scss';

export const TargetReportsPage = () => {
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;

  if (!displayCheck(SideMenuTypes.TARGET_REPORTS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='h-full'>
      <Layout>
        <Title className='mb-20'>Шаблоны отчётов</Title>

        <div className='flex gap-x-40 h-full hidden'>
          <ListTargetReports />
          {/*<SearchFormTargetReports />*/}
        </div>
      </Layout>
    </div>
  );
};
