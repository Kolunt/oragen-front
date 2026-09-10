import React, { useEffect, useState } from 'react';
import { ITab, Tabs } from 'ui-kit';
import { ListCurrentVisits, useCurrentVisitsStore } from 'pages';
import { VisitApprovalType, VisitStatusType } from 'api/visitsApi';
import './CurrentVisits.scss';

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

export const CurrentVisits = () => {
  const getVisits = useCurrentVisitsStore((state) => state.getVisits);
  const currentPage = useCurrentVisitsStore((state) => state.currentPage);
  const pageSize = useCurrentVisitsStore((state) => state.pageSize);
  const setApprovalStatus = useCurrentVisitsStore(
    (state) => state.setApprovalStatus
  );
  const approvalStatus = useCurrentVisitsStore((state) => state.approvalStatus);
  const status = useCurrentVisitsStore((state) => state.status);
  const setStatus = useCurrentVisitsStore((state) => state.setStatus);
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
    <div className='CurrentVisits hidden flex-container'>
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
      <ListCurrentVisits />
    </div>
  );
};
