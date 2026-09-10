import React, { useEffect } from 'react';
import { Kpi, PaginationFull } from 'components';
import { Layout } from 'components/Layout/Layout';
import { Button, Title } from 'ui-kit';
import { ListTargetKpi } from './ListTargetKpi/ListTargetKpi';
import { ListTargetKpiSorting } from './ListTargetKpiSorting/ListTargetKpiSorting';
import { useUserStore } from 'store/useUserStore';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import { useKpiStore } from './useKpiStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { displayCheck } from 'utils';
import './KpiPage.scss';

export const KpiPage = () => {
  const myRole = useUserStore((state) => state.me.roles[0].name);
  const targetsLocal = useKpiStore((state) => state.targetsLocal);
  const getTargetListLocal = useKpiStore((state) => state.getTargetListLocal);
  const sorting = useKpiStore((state) => state.sorting);
  const currentPage = useKpiStore((state) => state.currentPage);
  const setCurrentPage = useKpiStore((state) => state.setCurrentPage);
  const pageSize = useKpiStore((state) => state.pageSize);
  const setPageSize = useKpiStore((state) => state.setPageSize);
  const navigate = useNavigate();
  const numberOfLocalTargets = useKpiStore(
    (state) => state.numberOfLocalTargets
  );
  const me = useUserStore((state) => state.me);
  const isMedRep = myRole === RoleTypes.MED_REP;

  useEffect(() => {
    if (isMedRep) {
      getTargetListLocal(me.id);
    } else {
      //@ts-ignore
      getTargetListLocal();
    }
  }, [sorting.order, sorting.orderBy, currentPage, pageSize]);

  if (!displayCheck(SideMenuTypes.KPI, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }
  console.log(targetsLocal);
  return (
    <div className='KpiPage h-full'>
      <Layout>
        <div className='KpiPage__Header'>
          <Title>KPI</Title>
        </div>
        <div className='KpiPage__Content hidden h-full'>
          <div className='KpiBlock mr-15 relative flex-container'>
            <ListTargetKpiSorting />
            <ScrollBar>
              <div className='List'>
                {targetsLocal.map((target) => (
                  //@ts-ignore
                  <ListTargetKpi key={target.id} target={target} />
                ))}
              </div>
            </ScrollBar>
            <div className='Separator' />
            <Button
              onClick={() => navigate(ROUTES.KPI_FREE_VISITS)}
              disabled={!isMedRep}
            >
              Визиты вне таргет листа
            </Button>
            <PaginationFull
              className='mt-0'
              currentPage={currentPage}
              numberOfElements={numberOfLocalTargets}
              pageSize={pageSize}
              setCurrentPage={setCurrentPage}
              setPageSize={setPageSize}
            />
          </div>
          {myRole === RoleTypes.MED_REP && (
            <Kpi
              isCommonKpi={true}
              titleCommonKpi={'Общий KPI'}
              isKpiList={true}
            />
          )}
        </div>
      </Layout>
    </div>
  );
};
