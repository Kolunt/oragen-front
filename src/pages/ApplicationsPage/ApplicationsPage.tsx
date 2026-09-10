import React, { useEffect, useState } from 'react';
import {
  ModalAddApplication,
  ModalAddContact,
  ModalAddOrganization,
} from 'components';
import { Layout } from 'components/Layout/Layout';
import {
  ApplicationStatus,
  useApplicationsStore,
} from 'store/useApplicationsStore';
import { ITab, Tabs, Title } from 'ui-kit';
import { ListApplications } from './ListApplications/ListApplications';
import { useModalsStore } from 'store/useModalsStore';
import { IconButtonAdd } from 'ui-kit/Button/IconButtonAdd/IconButtonAdd';
import './ApplicationsPage.scss';
import { useUserStore } from 'store/useUserStore';
import { displayCheck } from 'utils';
import { ROUTES, SideMenuTypes } from 'enums';
import { Navigate } from 'react-router-dom';

const CONTACT_LIST = 'contact';
const ORGANIZATION_LIST = 'organization';
const ALL_STATUS = 'all';
const INPROCESS_STATUS = 'inprocess';
const ACCEPTED_STATUS = 'accepted';
const DECLINED_STATUS = 'declined';

const IN_PROCESS_ADMIN = 'inprocess admin';
const IN_PROCESS_USER = 'inprocess user';
const DECLINED_ADMIN = 'declined admin';
const DECLINED_USER = 'declined user';

export type ProposalType = 'contact' | 'organization';

const tabsTypeApplications: ITab[] = [
  { id: CONTACT_LIST, label: 'Контакты' },
  { id: 'organization', label: 'Организации' },
];

const tabsContacts: ITab[] = [
  { id: ALL_STATUS, label: 'Все' },
  { id: IN_PROCESS_ADMIN, label: 'Смотрит Админ' },
  { id: IN_PROCESS_USER, label: 'Смотрит Пользователь' },
  { id: DECLINED_ADMIN, label: 'Отмена Админ' },
  { id: DECLINED_USER, label: 'Отмена Пользователь' },
  { id: ACCEPTED_STATUS, label: 'Принята' },
];

const tabsOrg: ITab[] = [
  { id: ALL_STATUS, label: 'Все' },
  { id: INPROCESS_STATUS, label: 'На рассмотрении' },
  { id: ACCEPTED_STATUS, label: 'Выполненные' },
  { id: DECLINED_STATUS, label: 'Отклоненные' },
];

export const ApplicationsPage = () => {
  const myRole = useUserStore((state) => state.me.roles[0].name);
  const applications = useApplicationsStore((state) => state.applications);
  const filtration = useApplicationsStore((state) => state.filtration);
  const setFiltration = useApplicationsStore((state) => state.setFiltration);
  const getContactApplications = useApplicationsStore(
    (state) => state.getContactApplications
  );
  const getOrganizationApplications = useApplicationsStore(
    (state) => state.getOrganizationApplications
  );
  const showModal = useModalsStore((state) => state.handleApplication);
  const currentPage = useApplicationsStore((state) => state.currentPage);
  const pageSize = useApplicationsStore((state) => state.pageSize);

  const [selectedTabId, setSelectedTabId] = useState(tabsContacts[0].id);
  const [selectedTabOrgId, setSelectedTabOrgId] = useState(tabsOrg[0].id);
  const [selectedTabApplicationId, setSelectedApplicationTabId] = useState(
    tabsTypeApplications[0].id
  );

  useEffect(() => {
    selectedTabApplicationId === CONTACT_LIST
      ? getContactApplications()
      : getOrganizationApplications();
  }, [
    filtration.user_agreement,
    filtration.user_agreement_contact,
    filtration.where,
    currentPage,
    pageSize,
  ]);

  const handleTabApplications = (id: string | number) => {
    setSelectedApplicationTabId(id);
    if (id === CONTACT_LIST) {
      onFilterReset();
      getContactApplications();
    }
    if (id === ORGANIZATION_LIST) {
      onFilterReset();
      getOrganizationApplications();
    }
  };

  const handleTabClick = (id: string | number) => {
    setSelectedTabId(id);
    if (id !== ALL_STATUS) {
      if (id === IN_PROCESS_ADMIN) {
        setFiltration({
          ...filtration,
          where: {
            ...filtration.where,
            approval: 'inprocess',
          },
          user_agreement: 1,
          user_agreement_contact: 1,
        });
      }
      if (id === IN_PROCESS_USER) {
        setFiltration({
          ...filtration,
          where: {
            ...filtration.where,
            approval: 'inprocess',
          },
          user_agreement: 0,
          user_agreement_contact: undefined,
        });
      }
      if (id === DECLINED_USER) {
        setFiltration({
          ...filtration,
          where: {
            ...filtration.where,
            approval: 'inprocess',
          },
          user_agreement: 1,
          user_agreement_contact: 0,
        });
      }
      if (id === DECLINED_ADMIN) {
        getContactApplications({ where: 'declined' });
        setFiltration({
          ...filtration,
          where: {
            ...filtration.where,
            approval: 'declined',
          },
          user_agreement: undefined,
          user_agreement_contact: undefined,
        });
      }
      if (id === ACCEPTED_STATUS) {
        setFiltration({
          ...filtration,
          where: {
            ...filtration.where,
            approval: 'accepted',
          },
          user_agreement: undefined,
          user_agreement_contact: undefined,
        });
      }
    } else {
      onFilterReset();
    }
  };

  const handleTabClickOrg = (id: string | number) => {
    setSelectedTabOrgId(id);
    if (id !== ALL_STATUS) {
      setFiltration({
        ...filtration,
        where: {
          ...filtration.where,
          approval: id as ApplicationStatus,
        },
      });
    } else {
      onFilterReset();
    }
  };

  const onFilterReset = () => {
    setSelectedTabId(tabsContacts[0].id);
    setSelectedTabOrgId(tabsOrg[0].id);
    setFiltration({
      ...filtration,
      where: {},
      user_agreement: undefined,
      user_agreement_contact: undefined,
    });
  };

  if (!displayCheck(SideMenuTypes.APPLICATIONS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='ApplicationsPage h-full'>
      <Layout>
        <div className='ApplicationsPage__Header'>
          <Title>Заявки</Title>
          <IconButtonAdd onClick={() => showModal(true)}>
            Добавить заявку
          </IconButtonAdd>
        </div>
        <div className='ApplicationsPage__Content padding-inherit flex h-full'>
          <div className='ApplicationsBlock flex-container hidden'>
            <div className='FilterPanel'>
              <Tabs
                className='CustomTabs'
                selectedId={selectedTabApplicationId}
                tabs={tabsTypeApplications}
                onClick={handleTabApplications}
              />
              {selectedTabApplicationId === CONTACT_LIST ? (
                <Tabs
                  selectedId={selectedTabId}
                  tabs={tabsContacts}
                  onClick={handleTabClick}
                />
              ) : (
                <Tabs
                  selectedId={selectedTabOrgId}
                  tabs={tabsOrg}
                  onClick={handleTabClickOrg}
                />
              )}
            </div>
            <ListApplications applications={applications} />
          </div>
        </div>
      </Layout>
      <ModalAddApplication />
      <ModalAddContact />
      <ModalAddOrganization />
    </div>
  );
};
