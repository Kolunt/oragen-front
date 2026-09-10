import React, { useEffect, useState } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Title } from 'ui-kit';
import { usePollsStore } from 'store/usePollsStore';
import { IReport } from 'api/pollsApi';
import { Report } from 'components/Report';
import { RoleTypes, ROUTES, SideMenuTypes } from 'enums';
import { Breadcrumbs } from 'ui-kit/Breadcrumbs/Breadcrumbs';
import { Navigate, useNavigate } from 'react-router-dom';
import { useReportStore } from 'components/Report/useReportStore';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import { useUserStore } from 'store/useUserStore';
import { displayCheck } from 'utils';
import './TargetReportInfo.scss';

export const TargetReportInfo = () => {
  const polls = usePollsStore((state) => state.freePolls);
  const monitoredReportId = usePollsStore((state) => state.monitoredReportId);
  const setQuestions = useReportStore((state) => state.setQuestions);
  const questions = useReportStore((state) => state.questions);
  const [currentReport, setCurrentReport] = useState<IReport>({} as IReport);
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;
  const navigate = useNavigate();

  useEffect(() => {
    const report = polls.find((item) => item.id === monitoredReportId);
    if (report) {
      setCurrentReport(report);
      setQuestions(report.questions);
    }
  }, []);

  if (!displayCheck(SideMenuTypes.TARGET_REPORTS, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='flex-container'>
      <Layout>
        <Breadcrumbs
          links={[
            {
              title: 'Отчеты',
              callback: () => navigate(ROUTES.TARGET_REPORTS),
            },
            { title: `${currentReport.name}` },
          ]}
        />
        <Title className='mb-20'>{currentReport.name}</Title>
        <ScrollBar>
          <Report questions={questions} mode={'view'} />
        </ScrollBar>
      </Layout>
    </div>
  );
};
