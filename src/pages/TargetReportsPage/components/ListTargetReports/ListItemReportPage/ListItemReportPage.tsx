import React, { FC, MouseEvent } from 'react';
import { IReport } from 'api/pollsApi';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'enums';
import { usePollsStore } from 'store/usePollsStore';
import { Icon } from 'ui-kit';
import './ListItemReportPage.scss';

interface IListItemReportPage {
  report: IReport;
}

export const ListItemReportPage: FC<IListItemReportPage> = (props) => {
  const { report } = props;
  const setMonitoredReportId = usePollsStore(
    (state) => state.setMonitoredReportId
  );
  const removePoll = usePollsStore((state) => state.removePoll);
  const navigate = useNavigate();

  const onRedirectReportInfo = () => {
    setMonitoredReportId(report.id);
    navigate(ROUTES.TARGET_REPORT_INFO);
  };

  const onRemovePoll = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    removePoll(report.id);
  };

  return (
    <div className='ListItemReportPage' onClick={onRedirectReportInfo}>
      <div className='Cell Cell--Start'>{report.name}</div>
      <div className='Cell'>{report.id}</div>
      <div className='Cell' onClick={onRemovePoll}>
        <Icon type={'VisitsDeleteTableData'} />
      </div>
    </div>
  );
};
