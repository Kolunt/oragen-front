import React, { useEffect } from 'react';
import { ListTargetReportsSorting } from 'pages/index';
import { usePollsStore } from 'store/usePollsStore';
import { ListItemReportPage } from 'pages/index';
import { Button } from 'ui-kit';
import { ROUTES } from 'enums';
import { useNavigate } from 'react-router-dom';
import { PaginationFull } from 'components';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import './ListTargetReports.scss';

export const ListTargetReports = () => {
  const getFreePolls = usePollsStore((state) => state.getFreePolls);
  const freePolls = usePollsStore((state) => state.freePolls);
  const currentPageFreePolls = usePollsStore(
    (state) => state.currentPageFreePolls
  );
  const numberOfFreePolls = usePollsStore((state) => state.numberOfFreePolls);
  const pageSizeFreePolls = usePollsStore((state) => state.pageSizeFreePolls);
  const setCurrentPageFreePolls = usePollsStore(
    (state) => state.setCurrentPageFreePolls
  );
  const setPageSizePageFreePolls = usePollsStore(
    (state) => state.setPageSizePageFreePolls
  );
  const navigate = useNavigate();

  useEffect(() => {
    getFreePolls();
  }, [currentPageFreePolls, pageSizeFreePolls]);

  return (
    <div className='ListTargetReports relative flex-container'>
      <ListTargetReportsSorting />
      <ScrollBar>
        {freePolls.map((report) => (
          <ListItemReportPage key={report.id} report={report} />
        ))}
      </ScrollBar>
      <PaginationFull
        className='mt-20'
        currentPage={currentPageFreePolls}
        numberOfElements={numberOfFreePolls}
        pageSize={pageSizeFreePolls}
        setCurrentPage={setCurrentPageFreePolls}
        setPageSize={setPageSizePageFreePolls}
      />
      <Button
        className='mt-30'
        onClick={() => navigate(ROUTES.NEW_TARGET_REPORT)}
      >
        Создать отчёт
      </Button>
    </div>
  );
};
