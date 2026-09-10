import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../../../components/Layout/Layout';
import { Icon, ITab, Tabs, Title } from '../../../ui-kit';
import { useContactsStore } from '../../../store/useContactsStore';
import { ProfileContact } from '../../../components/Cards/CardContact/ProfileContact/ProfileContact';
import { useInformationContact } from './useInformationContact';
import { ScrollBar } from '../../../ui-kit/ScrollBar/ScrollBar';
import { ListItemAllVisits } from '../ContactInfoPage';
import { ModalApplicationContact, PaginationFull } from '../../../components';
import { ModalComment } from '../../../components/Modals/ModalComment/ModalComment';
import { LoyalityList } from './LoyalityList/LoyalityList';
import { Breadcrumbs } from '../../../ui-kit/Breadcrumbs/Breadcrumbs';
import { ROUTES } from '../../../enums';
import { useModalsStore } from 'store/useModalsStore';

const TAB_HISTORY_INTERACTION = 'history_interaction';
const TAB_LOYALTY = 'loyalty';

const informationTabs: ITab[] = [
  { id: TAB_HISTORY_INTERACTION, label: 'История взаимодействия' },
  // { id: '3', label: 'Потенциал' },
  { id: TAB_LOYALTY, label: 'Лояльность' },
  // { id: '5', label: 'Группы' },
];

export const InformationContactPage = () => {
  const { id_contact } = useParams();

  const contact = useContactsStore((state) => state.monitoredContact);
  const getContact = useContactsStore((state) => state.getMonitoredContact);
  const visitsForContact = useInformationContact(
    (state) => state.visitsForContact
  );
  const getVisitsForContact = useInformationContact(
    (state) => state.getVisitsForContact
  );
  const getLoyalityForContact = useInformationContact(
    (state) => state.getLoyalityForContact
  );
  const loyalityForContact = useInformationContact(
    (state) => state.loyalityForContact
  );
  const currentPage = useInformationContact((state) => state.currentPage);
  const pageSize = useInformationContact((state) => state.pageSize);
  const numberOfVisits = useInformationContact((state) => state.numberOfVisits);
  const setPageSize = useInformationContact((state) => state.setPageSize);
  const setCurrentPage = useInformationContact((state) => state.setCurrentPage);
  const showModal = useModalsStore((state) => state.handleApplicationContact);

  const [selectedTabId, setSelectedTabId] = useState(informationTabs[0].id);
  const setMonitoredContactId = useContactsStore(
    (state) => state.setMonitoredContactId
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (id_contact) {
      getContact(Number(id_contact));
      getVisitsForContact(id_contact);
      getLoyalityForContact(id_contact);
    }
  }, []);

  const { full_name, id } = contact;
  return (
    <Layout>
      <Breadcrumbs
        links={[
          { title: 'Контакты', callback: () => navigate(ROUTES.CONTACTS) },
          { title: `${contact?.full_name}` },
        ]}
      />
      <div className='flex mb-20'>
        <Title className='mr-5'>{full_name}</Title>
        <Icon
          className='CustomIcon pointer'
          type={'VisitsChangeTableData'}
          onClick={() => {
            setMonitoredContactId(+id);
            showModal(true);
          }}
        />
      </div>
      <div className='bg-white-l1 p-10 br-6 flex-container hidden'>
        <ProfileContact informationContact={contact} />
        <Tabs
          className='CustomTabs mt-10'
          selectedId={selectedTabId}
          tabs={informationTabs}
          onClick={(id) => setSelectedTabId(id)}
        />
        {selectedTabId === TAB_HISTORY_INTERACTION && (
          <div className='ListAllVisits flex-container relative hidden'>
            <ul className='ListHeader'>
              <li className='ListHeader__Item ListHeader__Item--start'>
                Дата визита
              </li>
              <li className='ListHeader__Item'>Препарат</li>
              <li className='ListHeader__Item'>Тип</li>
              <li className='ListHeader__Item'>Состояние</li>
              <li className='ListHeader__Item'>Статус</li>
              <li className='ListHeader__Item'>Исполнитель</li>
              <li className='ListHeader__Item'>Комментарии</li>
            </ul>

            <ScrollBar>
              {visitsForContact.map((visit) => {
                return <ListItemAllVisits key={visit.id} visit={visit} />;
              })}
            </ScrollBar>

            <PaginationFull
              className='mt-20'
              currentPage={currentPage}
              numberOfElements={numberOfVisits}
              pageSize={pageSize}
              setCurrentPage={setCurrentPage}
              setPageSize={setPageSize}
            />
          </div>
        )}
        {selectedTabId === TAB_LOYALTY && (
          <LoyalityList data={loyalityForContact} />
        )}
      </div>
      <ModalComment />
      <ModalApplicationContact />
    </Layout>
  );
};
