import React, { useEffect, useState } from 'react';
import { Layout } from 'components/Layout/Layout';
import { ITab, Tabs, Title } from 'ui-kit';
import { ModalChangeVisitMR } from 'components/Modals/ModalChangeVisitMR/ModalChangeVisitMR';
import { ModalComment } from 'components/Modals/ModalComment/ModalComment';
import { useContactsStore } from 'store/useContactsStore';
import { Routes, useNavigate } from 'react-router-dom';
import { AllVisits, CurrentVisits } from 'pages';
import { Breadcrumbs } from 'ui-kit/Breadcrumbs/Breadcrumbs';
import { ModalAddVisitor } from 'components/Modals/ModalAddVisitor/ModalAddVisitor';
import { ModalVisitFiles } from 'components/Modals/ModalVisitFiles/ModalVisitFiles';
import { ModalChangeVisitDate } from 'components/Modals/ModalChangeVisitDate/ModalChangeVisitDate';
import './ContactInfoPage.scss';
import { ROUTES } from 'enums';

const tabs: ITab[] = [
  { id: 'my visits', label: 'Мои визиты' },
  { id: 'all visits', label: 'Все визиты' },
];

export const ContactInfoPage = () => {
  const contact = useContactsStore((state) => state.monitoredContact);
  const getContact = useContactsStore((state) => state.getMonitoredContact);
  const contactId = useContactsStore((state) => state.monitoredContactId);
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);
  const navigate = useNavigate();
  useEffect(() => {
    if (contactId) {
      getContact(contactId);
    }
  }, []);

  return (
    <div className='ContactInfoPage flex-container'>
      <Layout>
        <div className='flex gap-x-40 h-full hidden'>
          <div className='InfoBlock flex-container'>
            <Breadcrumbs
              links={[
                { title: 'Назад', callback: () => navigate(ROUTES.VISITS) },
                { title: `${contact?.full_name}` },
              ]}
            />
            <div className='mb-20 flex justify-space-between'>
              <Title>{contact?.full_name}</Title>
              <Tabs
                selectedId={selectedTabId}
                tabs={tabs}
                onClick={setSelectedTabId}
              />
            </div>
            {selectedTabId === 'my visits' && <CurrentVisits />}
            {selectedTabId === 'all visits' && <AllVisits />}
          </div>

          <div className=' InfoCard'>
            <div className='Card'>
              <div className='InfoCard__Header'>
                <span>Информация о контакте</span>
              </div>

              <div className='InfoCard__Main'>
                <ul className='List'>
                  <li className='List__Item'>
                    <span>ФИО:</span>
                    <span>{contact?.full_name}</span>
                  </li>
                  <li className='List__Item'>
                    <span>Организация:</span>
                    <span>{contact?.company}</span>
                  </li>
                  <li className='List__Item'>
                    <span>Адрес:</span>
                    <span>{contact?.address}</span>
                  </li>
                  <li className='List__Item'>
                    <span>Специальность:</span>
                    <span>{contact?.position}</span>
                  </li>
                  {/*<li className='List__Item'>*/}
                  {/*  <span>Лояльность:</span>*/}
                  {/*  <span>А</span>*/}
                  {/*</li>*/}
                  {/*<li className='List__Item'>*/}
                  {/*  <span>Потенциал:</span>*/}
                  {/*  <span>В</span>*/}
                  {/*</li>*/}
                  <li className='List__Item'>
                    <span>Email:</span>
                    <span>{contact?.email}</span>
                  </li>
                  <li className='List__Item'>
                    <span>Телефон:</span>
                    <span>{contact?.phone}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <ModalChangeVisitMR />
      <ModalComment />
      <ModalAddVisitor />
      <ModalVisitFiles />
      <ModalChangeVisitDate />
    </div>
  );
};
