import React, { useEffect } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Title } from 'ui-kit';
import { useUserStore } from 'store/useUserStore';
import { ListVisits, SearchFormVisits } from 'pages';
import { useVisitsGroupStore } from 'pages/VisitsPage/useVisitsGroupStore';
import { displayCheck } from 'utils';
import { ROUTES, SideMenuTypes } from 'enums';
import { Navigate } from 'react-router-dom';
import './VisitsPage.scss';

export const VisitsPage = () => {
  const getVisits = useVisitsGroupStore((state) => state.getVisits);
  const currentPage = useVisitsGroupStore((state) => state.currentPage);
  const pageSize = useVisitsGroupStore((state) => state.pageSize);
  const contactId = useVisitsGroupStore((state) => state.contactId);
  const address = useVisitsGroupStore((state) => state.address);
  const drugId = useVisitsGroupStore((state) => state.drugId);
  const myRole = useUserStore((state) => state.me.roles[0].name);
  const me = useUserStore((state) => state.me);
  const isMedRep = me.roles[0].id === 8;

  useEffect(() => {
    if (isMedRep) {
      getVisits(me.id);
    } else {
      getVisits();
    }
  }, [currentPage, pageSize, drugId, contactId, address]);

  if (!displayCheck(SideMenuTypes.VISITS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='VisitsPage flex-container bg-background-l7'>
      <Layout>
        <Title className='mb-20 flex gap-x-40 items-center'>Визиты</Title>
        <div className='flex gap-x-40 h-full hidden'>
          <ListVisits />
          <SearchFormVisits />
        </div>
      </Layout>
    </div>
  );
};
