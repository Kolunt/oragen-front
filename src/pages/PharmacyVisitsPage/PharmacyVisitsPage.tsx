import React, { useEffect } from 'react';
import { Title } from 'ui-kit';
import { Layout } from 'components/Layout/Layout';
import { useUserStore } from 'store/useUserStore';
import { ListPharmacyVisit, SearchListPharmacy } from 'pages';
import { useVisitsGroupPharmacyStore } from 'pages/PharmacyVisitsPage/useVisitsGroupPharmacy';
import { displayCheck } from 'utils';
import { ROUTES, SideMenuTypes } from 'enums';
import { Navigate } from 'react-router-dom';
import './PharmacyVisitsPage.scss';

export const PharmacyVisitsPage = () => {
  const getVisits = useVisitsGroupPharmacyStore((state) => state.getVisits);
  const currentPage = useVisitsGroupPharmacyStore((state) => state.currentPage);
  const pageSize = useVisitsGroupPharmacyStore((state) => state.pageSize);
  const organizationId = useVisitsGroupPharmacyStore(
    (state) => state.organizationId
  );
  const address = useVisitsGroupPharmacyStore((state) => state.address);
  const drugId = useVisitsGroupPharmacyStore((state) => state.drugId);
  const myRole = useUserStore((state) => state.me.roles[0].name);
  const me = useUserStore((state) => state.me);
  const isMedRep = me.roles[0].id === 8;

  useEffect(() => {
    if (isMedRep) {
      getVisits(me.id);
    } else {
      getVisits();
    }
  }, [currentPage, pageSize, drugId, organizationId, address]);

  if (!displayCheck(SideMenuTypes.PHARMACY_VISITS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='h-full'>
      <Layout>
        <Title className='mb-20'>Визиты в Аптеку</Title>
        <div className='flex gap-x-40 h-full flex'>
          <ListPharmacyVisit />
          <SearchListPharmacy />
        </div>
      </Layout>
    </div>
  );
};
