import React, { useEffect } from 'react';
import {
  ModalAddOrganization,
  ModalApplicationOrganization,
  ModalCardOrganization,
} from 'components';
import { Layout } from 'components/Layout/Layout';
import { useOrganizationsStore } from 'store/useOrganizationsStore';
import { ITab, Tabs, Title } from 'ui-kit';
import {
  getIdByOrganizationType,
  getOrganizationTypeById,
} from 'utils/getOrganizationTypeById';
import { ListOrganizations } from './components/ListOrganizations';
import { SearchFormOrganizations } from './components/SearchFormOrganizations';
import { OrganizationType } from 'TypeInterface';
import './OrganizationsPage.scss';
import { useUserStore } from 'store/useUserStore';
import { displayCheck } from 'utils';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { Navigate } from 'react-router-dom';

const tabs: ITab[] = [
  { id: '1', label: 'Все' },
  { id: '2', label: 'ЛПУ' },
  { id: '3', label: 'Аптеки' },
];

export const OrganizationsPage = () => {
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  const getOrganizations = useOrganizationsStore(
    (state) => state.getOrganizations
  );
  const sorting = useOrganizationsStore((state) => state.sorting);
  const filtration = useOrganizationsStore((state) => state.filtration);
  const searchName = useOrganizationsStore((state) => state.searchName);
  const searchAddress = useOrganizationsStore((state) => state.searchAddress);
  const setFiltration = useOrganizationsStore((state) => state.setFiltration);
  const currentPage = useOrganizationsStore((state) => state.currentPage);
  const setCurrentPage = useOrganizationsStore((state) => state.setCurrentPage);
  const pageSize = useOrganizationsStore((state) => state.pageSize);

  // const debouncedSearch = useDebounce(filtration.search);

  const handleTabClick = (id: string | number) => {
    setFiltration({
      ...filtration,
      where: {
        ...filtration.where,
        organization_type: getOrganizationTypeById(id) as OrganizationType,
      },
    });
    setCurrentPage(1);
  };

  useEffect(() => {
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
  ]);

  if (!displayCheck(SideMenuTypes.ORGANIZATIONS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <>
      <Layout>
        <div className='mb-20 flex items-center gap-x-40 '>
          <Title>Организации</Title>
          <Tabs
            selectedId={getIdByOrganizationType(
              filtration.where.organization_type
            )}
            tabs={tabs}
            onClick={handleTabClick}
          />
        </div>
        <div className='flex gap-x-40 hidden'>
          <ListOrganizations />
          <SearchFormOrganizations />
        </div>
      </Layout>
      <ModalAddOrganization />
      <ModalCardOrganization />
      <ModalApplicationOrganization />
    </>
  );
};
