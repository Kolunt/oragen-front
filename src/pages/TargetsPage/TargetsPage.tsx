import React from 'react';
import { Layout } from 'components/Layout/Layout';
import { Title } from 'ui-kit';
import { ListTargets } from 'pages';
import { StepperTargets } from 'components';
import { useUserStore } from 'store/useUserStore';
import { displayCheck } from 'utils';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { Navigate } from 'react-router-dom';
import './TargetsPage.scss';

export const TargetsPage = () => {
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;

  if (!displayCheck(SideMenuTypes.TARGET_LIST, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <Layout>
      <Title className='mb-20'>Таргет-лист: Руководитель</Title>
      <StepperTargets className='mb-20' active={1} />
      <ListTargets />
    </Layout>
  );
};
