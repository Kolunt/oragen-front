import React from 'react';
import { Layout } from 'components/Layout/Layout';
import { Title } from 'ui-kit';
import { MatchedContactsList } from './MatchedContactsList';
import { StepperTargets } from 'components';
import { ModalChangeVisitsCount } from 'components/Modals/ModalChangeVisitsCount/ModalChangeVisitsCount';
import './MatchedContacts.scss';
import { useUserStore } from 'store/useUserStore';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { displayCheck } from 'utils';
import { Navigate } from 'react-router-dom';

export const MatchedContacts = () => {
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;

  if (!displayCheck(SideMenuTypes.TARGET_REPORTS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='bg-background-l7'>
      <Layout>
        <Title className='mb-20'>Таргет-лист: соответствующие контакты</Title>
        <StepperTargets className='mb-20' active={4} />
        <div className='flex gap-x-40'>
          <MatchedContactsList />
          {/*<MatchedContactsSearchForm />*/}
        </div>
      </Layout>
      {/*<ModalComment />*/}
      <ModalChangeVisitsCount />
    </div>
  );
};
