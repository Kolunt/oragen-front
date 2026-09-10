import React, { useEffect } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Title } from 'ui-kit';
import { ModalAddDrug } from 'components/Modals/ModalAddDrug/ModalAddDrug';
import { useDrugsStore } from 'store/useDrugsStore';
import { DrugList } from 'pages';
import { DrugsSearchForm } from 'pages';
import './Drugs.scss';
import { useUserStore } from 'store/useUserStore';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { displayCheck } from 'utils';
import { Navigate } from 'react-router-dom';

export const Drugs = () => {
  const getDrugs = useDrugsStore((state) => state.getDrugs);
  const sorting = useDrugsStore((state) => state.sorting);
  const currentPage = useDrugsStore((state) => state.currentPage);
  const pageSize = useDrugsStore((state) => state.pageSize);
  const search = useDrugsStore((state) => state.search);
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;

  useEffect(() => {
    getDrugs();
  }, [sorting.orderBy, sorting.order, currentPage, pageSize, search]);

  if (!displayCheck(SideMenuTypes.ADMIN, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <>
      <Layout>
        <div className='Drugs__Header'>
          <Title>Администрирование: Препараты</Title>
        </div>
        <div className='Drugs__Content gap-x-40 h-full hidden'>
          <DrugList />
          <DrugsSearchForm />
        </div>
      </Layout>
      <ModalAddDrug />
    </>
  );
};
