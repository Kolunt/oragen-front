import React, { useEffect } from 'react';
import { ModalAddContact, ModalApplicationContact } from 'components';
import { useContactsStore } from 'store/useContactsStore';
import { ITab, Tabs, Title } from 'ui-kit';
import {
  getIdByOrganizationType,
  getOrganizationTypeById,
} from 'utils/getOrganizationTypeById';
import { ListContacts, SearchFormContacts } from 'pages';
import { OrganizationType } from 'TypeInterface';
import { Layout } from 'components/Layout/Layout';
import { useUserStore } from 'store/useUserStore';
import { displayCheck } from 'utils';
import { ROUTES, SideMenuTypes } from 'enums';
import { Navigate } from 'react-router-dom';
import './ContactsPage.scss';

const tabs: ITab[] = [
  { id: '1', label: 'Все' },
  { id: '2', label: 'ЛПУ' },
  { id: '3', label: 'Аптеки и аптечные сети' },
];

export const ContactsPage = () => {
  const myRole = useUserStore((state) => state.me.roles[0].name);
  const getContacts = useContactsStore((state) => state.getContacts);
  const sorting = useContactsStore((state) => state.sorting);
  const filtration = useContactsStore((state) => state.filtration);
  const searchName = useContactsStore((state) => state.searchName);
  const searchAddress = useContactsStore((state) => state.searchAddress);
  const setFiltration = useContactsStore((state) => state.setFiltration);
  const currentPage = useContactsStore((state) => state.currentPage);
  const setCurrentPage = useContactsStore((state) => state.setCurrentPage);
  const pageSize = useContactsStore((state) => state.pageSize);

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
    getContacts();
  }, [
    sorting.order,
    sorting.orderBy,
    filtration.where.organization_type,
    filtration.where.position,
    searchName,
    searchAddress,
    filtration.drugId,
    currentPage,
    pageSize,
  ]);

  if (!displayCheck(SideMenuTypes.CONTACTS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <>
      <Layout>
        <div className='mb-20 flex items-center gap-x-40'>
          <Title>Контакты</Title>
          <Tabs
            selectedId={getIdByOrganizationType(
              filtration.where.organization_type
            )}
            tabs={tabs}
            onClick={handleTabClick}
          />
        </div>
        <div className='flex gap-x-40 hidden'>
          <ListContacts />
          <SearchFormContacts />
        </div>
      </Layout>
      <ModalAddContact />
      <ModalApplicationContact />
    </>
  );
};
