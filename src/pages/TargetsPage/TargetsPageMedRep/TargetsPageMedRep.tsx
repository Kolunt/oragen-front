import React from 'react';
import { Title } from 'ui-kit';
import { Layout } from 'components/Layout/Layout';
import { TargetsMedRepList } from './TargetsMedRepList';
import { StepperTargets } from 'components';
import { ModalChangeVisitsCount } from 'components/Modals/ModalChangeVisitsCount/ModalChangeVisitsCount';
import './TargetsPageMedRep.scss';
import { useUserStore } from 'store/useUserStore';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { displayCheck } from 'utils';
import { Navigate } from 'react-router-dom';

export const TargetsPageMedRep = () => {
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;

  if (!displayCheck(SideMenuTypes.TARGET_LIST, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='h-full'>
      <Layout>
        <Title className='mb-20'>Таргет-лист: МП</Title>
        <StepperTargets className='mb-20' active={3} />
        <div className='flex gap-x-40 h-full hidden'>
          <TargetsMedRepList />
          {/*<TargetsMedRepSearchForm />*/}
        </div>
      </Layout>
      <ModalChangeVisitsCount />
    </div>
  );
};
