import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ITab, Tabs, Title } from 'ui-kit';
import { Layout } from 'components/Layout/Layout';
import { Breadcrumbs } from 'ui-kit/Breadcrumbs/Breadcrumbs';
import { ModalComment } from 'components/Modals/ModalComment/ModalComment';
import {
  AllVisitsPharmacy,
  CurrentVisitsPharmacy,
  usePharmacyInfoStore,
} from 'pages';
import { ModalAddVisitorPharmacy } from 'components/Modals/ModalAddVisitor/ModalAddVisitorPharmacy';
import { ModalChangeVisitPharmacyMR } from 'components/Modals/ModalChangeVisitPharmacyMR/ModalChangeVisitPharmacyMR';
import { ModalVisitFiles } from 'components/Modals/ModalVisitFiles/ModalVisitFiles';
import './PharmacyInfo.scss';
import { ROUTES } from 'enums';

const tabs: ITab[] = [
  { id: 'my visits', label: 'Мои визиты' },
  { id: 'all visits', label: 'Все визиты' },
];

export const PharmacyInfo = () => {
  const organization = usePharmacyInfoStore((state) => state.organization);
  const getOrganization = usePharmacyInfoStore(
    (state) => state.getOrganization
  );
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);
  const navigate = useNavigate();

  useEffect(() => {
    getOrganization();
  }, []);

  return (
    <div className='PharmacyInfo flex-container'>
      <Layout>
        <div className='flex gap-x-40 hidden'>
          <div className='InfoBlock flex-container'>
            <Breadcrumbs
              links={[
                {
                  title: 'Назад',
                  callback: () => navigate(ROUTES.PHARMACY_VISITS),
                },
                { title: `${organization?.name}` },
              ]}
            />
            <div className='mb-20 flex justify-space-between'>
              <Title>{organization?.name}</Title>
              <Tabs
                selectedId={selectedTabId}
                tabs={tabs}
                onClick={setSelectedTabId}
              />
            </div>
            {selectedTabId === 'my visits' && <CurrentVisitsPharmacy />}
            {selectedTabId === 'all visits' && <AllVisitsPharmacy />}
          </div>

          {/*<div className='InfoCard'>
            <div className='InfoCard__Header'>
              <span>Информация о контакте</span>
            </div>

            <div className='InfoCard__Main'>
              <ul className='List'>
                <li className='List__Item'>
                  <span>Название:</span>
                  <span>{organization?.name}</span>
                </li>
                <li className='List__Item'>
                  <span>Штат сотрудников:</span>
                  <span>{organization?.number_of_employees}</span>
                </li>
                <li className='List__Item'>
                  <span>Адрес:</span>
                  <span>{organization?.address}</span>
                </li>
              </ul>
            </div>
          </div>*/}
        </div>
      </Layout>
      <ModalChangeVisitPharmacyMR />
      <ModalComment />
      <ModalAddVisitorPharmacy />
      <ModalVisitFiles />
    </div>
  );
};
