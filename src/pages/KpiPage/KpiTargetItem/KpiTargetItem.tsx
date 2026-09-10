import React, { useEffect, useMemo } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Title } from 'ui-kit';
import { Kpi } from 'components';
import { useUserStore } from 'store/useUserStore';
import { ListVisitKpi } from './ListVisitByTarget/ListVisitKpi';
import { ListVisitKpiSorting } from './ListVisitByTarget/ListVisitKpiSorting';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import { useKpiStore } from '../useKpiStore';
import { RoleTypes, ROUTES } from 'enums';
import { Breadcrumbs } from 'ui-kit/Breadcrumbs/Breadcrumbs';
import { useNavigate, useParams } from 'react-router-dom';

export const KpiTargetItem = () => {
  const myRole = useUserStore((state) => state.me.roles[0].name);
  const getMonitoredTargetForKpi = useKpiStore(
    (state) => state.getMonitoredTargetForKpi
  );
  const monitoredTargetForKpiId = useKpiStore(
    (state) => state.monitoredTargetForKpiId
  );
  const getVisitsForKpi = useKpiStore((state) => state.getVisitsForKpi);
  const visitsForKpi = useKpiStore((state) => state.visitsForKpi);
  // const currentPage = useVisitsStore((state) => state.currentPage);
  // const numberOfVisits = useVisitsStore((state) => state.numberOfVisits);
  // const pageSize = useVisitsStore((state) => state.pageSize);
  // const setCurrentPage = useVisitsStore((state) => state.setCurrentPage);
  // const setPageSize = useVisitsStore((state) => state.setPageSize);
  const setTargetListId = useKpiStore((state) => state.setTargetListId);
  const me = useUserStore((state) => state.me);
  const isMedRep = me.roles[0].id === 8;
  const navigate = useNavigate();
  const { target_list_id } = useParams();

  useEffect(() => {
    if (monitoredTargetForKpiId) {
      getMonitoredTargetForKpi(monitoredTargetForKpiId);
      setTargetListId(monitoredTargetForKpiId);
    }
  }, [monitoredTargetForKpiId]);

  useEffect(() => {
    if (target_list_id) {
      getVisitsForKpi(me.id, target_list_id);
    }
  }, [target_list_id, monitoredTargetForKpiId]);
  console.log(visitsForKpi);
  // todo прописать заголовок из visitsForKpi
  return (
    <Layout>
      <Breadcrumbs
        links={[
          { title: 'KPI', callback: () => navigate(ROUTES.KPI) },
          { title: `Визиты` },
        ]}
      />
      <Title className='mb-20'>KPI: {}</Title>
      <div className='flex justify-space-between h-full hidden'>
        <div className='bg-background-l8 w-full br-10 pt-22 pb-12 pl-36 pr-36 pr-20 mr-15 relative flex-container'>
          <ListVisitKpiSorting />
          <ScrollBar>
            <div className=''>
              {visitsForKpi.map((item) => (
                <ListVisitKpi key={item.contact_id} contact={item} />
              ))}
            </div>
          </ScrollBar>
          {/*<PaginationFull*/}
          {/*  currentPage={currentPage}*/}
          {/*  numberOfElements={numberOfVisits}*/}
          {/*  pageSize={pageSize}*/}
          {/*  setCurrentPage={setCurrentPage}*/}
          {/*  setPageSize={setPageSize}*/}
          {/*/>*/}
        </div>
      </div>
    </Layout>
  );
};
