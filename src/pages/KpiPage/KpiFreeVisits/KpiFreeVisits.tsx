import React, { useEffect, useMemo } from 'react';
import { Layout } from 'components/Layout/Layout';
import { ListVisitKpiSorting } from 'pages/KpiPage/KpiTargetItem/ListVisitByTarget/ListVisitKpiSorting';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import { Kpi, PaginationFull } from 'components';
import { useFreeVisitsStore } from 'pages/KpiPage/KpiFreeVisits/useFreeVisitsStore';
import { KpiFreeVisitsItem } from 'pages/KpiPage/KpiFreeVisits/KpiFreeVisitsItem/KpiFreeVisitsItem';
import { Breadcrumbs } from 'ui-kit/Breadcrumbs/Breadcrumbs';
import { RoleTypes, ROUTES } from 'enums';
import { useNavigate } from 'react-router-dom';
import { Title } from 'ui-kit';
import { useUserStore } from 'store/useUserStore';

export const KpiFreeVisits = () => {
  const myRole = useUserStore((state) => state.me.roles[0].name);
  const visits = useFreeVisitsStore((state) => state.visits);
  const getVisits = useFreeVisitsStore((state) => state.getVisits);
  const currentPage = useFreeVisitsStore((state) => state.currentPage);
  const setCurrentPage = useFreeVisitsStore((state) => state.setCurrentPage);
  const pageSize = useFreeVisitsStore((state) => state.pageSize);
  const setPageSize = useFreeVisitsStore((state) => state.setPageSize);
  const numberOfVisits = useFreeVisitsStore((state) => state.numberOfVisits);
  const navigate = useNavigate();

  useEffect(() => {
    getVisits();
  }, [currentPage, pageSize]);

  return (
    <Layout>
      <Breadcrumbs
        links={[
          { title: 'KPI', callback: () => navigate(ROUTES.KPI) },
          { title: `Визиты созданные вручную` },
        ]}
      />
      <Title className='mb-20'>Визиты созданные вручную</Title>
      <div className='flex justify-space-between h-full hidden'>
        <div className='bg-background-l8 w-full br-10 pt-22 pb-12 pl-36 pr-36 pr-20 mr-15 relative flex-container'>
          <ListVisitKpiSorting />
          <ScrollBar>
            {visits.map((item) => (
              <KpiFreeVisitsItem key={item.id} visit={item} />
            ))}
          </ScrollBar>
          <PaginationFull
            currentPage={currentPage}
            numberOfElements={numberOfVisits}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            setPageSize={setPageSize}
          />
        </div>
        {myRole === RoleTypes.MED_REP && <Kpi />}
      </div>
    </Layout>
  );
};
