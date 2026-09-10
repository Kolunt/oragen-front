import React, { useEffect } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Title } from 'ui-kit';
import { Breadcrumbs } from 'ui-kit/Breadcrumbs/Breadcrumbs';
import { Report, useReportStore } from 'components/Report';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'enums';
import './PharmacyVisitsReportPage.scss';

export const PharmacyVisitsReportPage = () => {
  const monitoredReport = useReportStore((state) => state.monitoredReport);
  const questions = useReportStore((state) => state.questions);
  const setQuestions = useReportStore((state) => state.setQuestions);
  const editMode = useReportStore((state) => state.editMode);
  const navigate = useNavigate();

  useEffect(() => {
    if (!!monitoredReport) {
      setQuestions(monitoredReport.questions);
    }
  }, []);

  const reportEditingStatus =
    monitoredReport?.status !== 'filled'
      ? editMode
        ? 'edit'
        : 'view'
      : 'view';

  return (
    <div className='VisitReportPage h-full'>
      <Layout>
        {!!!monitoredReport ? (
          <>
            <Breadcrumbs
              className='mb-20'
              links={[
                { title: 'Назад', callback: () => navigate(-1) },
                { title: 'Отчет о визите' },
              ]}
            />
            <Title>Отчет не прикреплен!</Title>
          </>
        ) : (
          <>
            <Title className='mb-20'>Отчет о визите</Title>
            <Report
              questions={questions}
              mode={reportEditingStatus}
              redirect={() => navigate(ROUTES.ORGANIZATIONS_INFO)}
            />
          </>
        )}
      </Layout>
    </div>
  );
};
