import React, { useEffect } from 'react';
import './Test.scss';
import { ITab, Tabs, Title } from 'ui-kit';
import { useUserStore } from 'store/useUserStore';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { useOrganizationsStore } from 'store/useOrganizationsStore';
import { displayCheck, getOrganizationTypeById } from 'utils';
import { OrganizationType } from 'TypeInterface';
import { Navigate } from 'react-router-dom';
import { Layout } from 'components/Layout/Layout';
import { getIdByOrganizationType } from 'utils/getOrganizationTypeById';
import {
  ListOrganizations,
  SearchFormOrganizations,
} from 'pages/OrganizationsPage';
import {
  ModalAddOrganization,
  ModalApplicationOrganization,
  ModalCardOrganization,
} from 'components';
import { useOrganizationsQuery } from 'pages/Test/queries';

const tabs: ITab[] = [
  { id: '1', label: 'Все' },
  { id: '2', label: 'ЛПУ' },
  { id: '3', label: 'Аптеки' },
];

export const Test = () => {
  // const me = useUserStore((state) => state.me);
  // const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  // const getOrganizations = useOrganizationsStore(
  //     (state) => state.getOrganizations
  // );
  // const sorting = useOrganizationsStore((state) => state.sorting);
  // const filtration = useOrganizationsStore((state) => state.filtration);
  // const searchName = useOrganizationsStore((state) => state.searchName);
  // const searchAddress = useOrganizationsStore((state) => state.searchAddress);
  // const setFiltration = useOrganizationsStore((state) => state.setFiltration);
  // const currentPage = useOrganizationsStore((state) => state.currentPage);
  // const setCurrentPage = useOrganizationsStore((state) => state.setCurrentPage);
  // const pageSize = useOrganizationsStore((state) => state.pageSize);

  /*  const handleTabClick = (id: string | number) => {
    setFiltration({
      ...filtration,
      where: {
        ...filtration.where,
        organization_type: getOrganizationTypeById(id) as OrganizationType,
      },
    });
    setCurrentPage(1);
  };*/

  /*  useEffect(() => {
    getOrganizations();
  }, [
    sorting.order,
    sorting.orderBy,
    filtration.where.organization_type,
    filtration.where.address,
    searchName,
    searchAddress,
    currentPage,
    pageSize,
  ]);*/

  const { data, isLoading, isSuccess } = useOrganizationsQuery();

  return (
    <>
      <Layout>
        <div className='mb-20 flex items-center gap-x-40 '>
          <Title>Тестовые данные</Title>
          {/*            <Tabs
                selectedId={getIdByOrganizationType(
                    filtration.where.organization_type
                )}
                tabs={tabs}
                onClick={handleTabClick}
            />*/}
        </div>
        <div className='flex gap-x-40 hidden'>
          {/*<ListOrganizations />*/}
          {/*<SearchFormOrganizations />*/}
        </div>
      </Layout>
      {/*        <ModalAddOrganization />
        <ModalCardOrganization />
        <ModalApplicationOrganization />*/}
    </>
  );
};
