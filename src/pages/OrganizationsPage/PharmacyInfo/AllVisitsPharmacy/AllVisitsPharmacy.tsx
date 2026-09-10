import React, { useEffect, useState } from 'react';
import { ITab, Tabs } from 'ui-kit';
import { VisitApprovalType, VisitStatusType } from 'api/visitsApi';
import { ListAllVisitsPharmacy } from 'pages/OrganizationsPage/PharmacyInfo/AllVisitsPharmacy/ListAllVisitsPharmacy';
import { useVisitsPharmacyStore } from 'store/useVisitsPharmacyStore';
import './AllVisitsPharmacy.scss';

const tabsStatus: ITab[] = [
  { id: 'all', label: 'Все' },
  { id: 'upcoming', label: 'Предстоящие' },
  { id: 'live', label: 'Сейчас идут' },
  { id: 'archived', label: 'Завершенные' },
];

const tabsApproval: ITab[] = [
  { id: 'all', label: 'Все' },
  { id: 'not_processed', label: 'Не назначено' },
  { id: 'accepted', label: 'Принятые' },
  { id: 'declined', label: 'Отклоненные' },
  { id: 'canceled', label: 'Отмененные' },
];

export const AllVisitsPharmacy = () => {
  const getVisits = useVisitsPharmacyStore(
    (state) => state.getVisitsByOrganization
  );
  const currentPage = useVisitsPharmacyStore((state) => state.currentPage);
  const pageSize = useVisitsPharmacyStore((state) => state.pageSize);
  const setApprovalStatus = useVisitsPharmacyStore(
    (state) => state.setApprovalStatus
  );
  const setStatus = useVisitsPharmacyStore((state) => state.setStatus);
  const approvalStatus = useVisitsPharmacyStore(
    (state) => state.approvalStatus
  );
  const status = useVisitsPharmacyStore((state) => state.status);
  const [selectedTabStatusId, setSelectedTabStatusId] = useState(
    tabsStatus[0].id
  );
  const [selectedTabApprovalId, setSelectedTabApprovalId] = useState(
    tabsApproval[0].id
  );

  useEffect(() => {
    setStatus(undefined);
    setApprovalStatus(undefined);
  }, []);

  useEffect(() => {
    getVisits();
  }, [currentPage, pageSize, approvalStatus, status]);

  const onChangeTabStatus = (id: string | number) => {
    setSelectedTabStatusId(id);
    const currentTab = tabsStatus.find((item) => item.id === id);
    if (currentTab) {
      setStatus(
        currentTab.id === 'all' ? undefined : (currentTab.id as VisitStatusType)
      );
    }
  };

  const onChangeTabApproval = (id: string | number) => {
    setSelectedTabApprovalId(id);
    const currentTab = tabsApproval.find((item) => item.id === id);
    if (currentTab) {
      setApprovalStatus(
        currentTab.id === 'all'
          ? undefined
          : (currentTab.id as VisitApprovalType)
      );
    }
  };

  return (
    <div className='AllVisitsPharmacy flex-container hidden'>
      <div className='mb-20 flex gap-x-40'>
        <Tabs
          selectedId={selectedTabStatusId}
          tabs={tabsStatus}
          onClick={onChangeTabStatus}
        />
        <Tabs
          selectedId={selectedTabApprovalId}
          tabs={tabsApproval}
          onClick={onChangeTabApproval}
        />
      </div>
      <ListAllVisitsPharmacy />
    </div>
  );
};
