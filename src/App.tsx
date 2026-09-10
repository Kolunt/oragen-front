import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {
  AdministrationAddEmployee,
  AdministrationEmployeeList,
  AdministrationPage,
  AgreementPage,
  ApplicationsPage,
  BrickInfo,
  BrickList,
  BrickNew,
  CalendarPage,
  ChangeTargetPage,
  ContactsPage,
  Drugs,
  EventInfoPage,
  EventsPage,
  GeoTargetingInfoPage,
  GeoTargetingPage,
  HomePage,
  KpiPage,
  KpiTargetItem,
  MainPage,
  MatchedContacts,
  MediaInfo,
  MediaPage,
  NewProjectPage,
  NewProjectTaskPage,
  NewTargetPage,
  NewTargetReportPage,
  NewTaskPage,
  OrganizationsPage,
  PharmacyInfo,
  PharmacyVisitsPage,
  PharmacyVisitsReportPage,
  PresentationPage,
  ProjectInfoPage,
  ProjectsPage,
  SubTaskInfoPage,
  TargetInfo,
  TargetReportInfo,
  TargetReportsPage,
  TargetsPage,
  TargetsPageMedRep,
  TaskInfoPage,
  TasksPage,
  VersionPage,
  VideoCallPage,
  VisitReportPage,
  VisitsPage,
} from 'pages';
import { ROUTES } from 'enums';
import { ModalError, ProtectedRoute } from 'components';
import { Test } from 'pages/Test/Test';
import { ContactInfoPage } from 'pages/ContactsPage/ContactInfoPage';
import { KpiFreeVisits } from 'pages/KpiPage/KpiFreeVisits/KpiFreeVisits';
import { PresentationMedia } from 'pages/PresentationMedia/PresentationMedia';
import { InformationContactPage } from './pages/ContactsPage/InformationContactPage/InformationContactPage';
import { MessageComponent } from 'components/MessageComponent/MessageComponent';
import { MedRedPage } from './pages/MedRed/item/MedRedPage';
import { MedRedList } from './pages/MedRed/list/MedRedList';
import locale from 'antd/es/locale/ru_RU';
import { ConfigProvider } from 'antd';
import { useLocation } from 'react-router';
import { Spin } from 'antd';
import { fetchGetFullLink } from 'api/commonApi';
import { ForgotPasswordPage } from './pages/MainPage/ForgotPasswordPage/ForgotPasswordPage';
import './App.scss';

export const App = () => {
  const [agreement, setAgreement] = useState(false);
  const [agreementId, setAgreementId] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const checkLink = async () => {
    try {
      const code = location.pathname.slice(1);
      if (code.length === 6) {
        const { data } = await fetchGetFullLink(code);
        if (data.success) {
          setAgreement(true);
          setAgreementId(data.route.split('/').reverse()[0]);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkLink();
  }, []);

  if (loading)
    return (
      <Spin size={'large'} style={{ marginTop: '40%', marginLeft: '48%' }} />
    );

  if (agreement) return <AgreementPage id={agreementId} />;

  const InternalRoutes = () => {
    return (
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.EVENTS} element={<EventsPage />} />
        <Route path={ROUTES.EVENT_INFO} element={<EventInfoPage />} />
        <Route path={ROUTES.VISITS} element={<VisitsPage />} />
        <Route path={ROUTES.PHARMACY_VISITS} element={<PharmacyVisitsPage />} />
        {/*<Route path={ROUTES.VISIT_INFO} element={<VisitInfoPage />} />*/}
        <Route path={ROUTES.GEO_TARGETING} element={<GeoTargetingPage />} />
        <Route
          path={ROUTES.GEO_TARGETING_INFO}
          element={<GeoTargetingInfoPage />}
        />
        <Route path={ROUTES.VISIT_REPORT} element={<VisitReportPage />} />
        <Route
          path={ROUTES.VISIT_REPORT_PHARMACY}
          element={<PharmacyVisitsReportPage />}
        />
        <Route path={ROUTES.CALENDAR} element={<CalendarPage />} />
        <Route path={ROUTES.APPLICATIONS} element={<ApplicationsPage />} />
        <Route path={ROUTES.CONTACTS} element={<ContactsPage />} />
        <Route path={ROUTES.CONTACTS_INFO} element={<ContactInfoPage />} />
        <Route
          path={ROUTES.INFORMATION_CONTACT}
          element={<InformationContactPage />}
        />
        <Route path={ROUTES.ORGANIZATIONS} element={<OrganizationsPage />} />
        <Route path={ROUTES.ORGANIZATIONS_INFO} element={<PharmacyInfo />} />
        <Route path={ROUTES.MEDIA} element={<MediaPage />} />
        <Route path={ROUTES.MEDIA_INFO} element={<MediaInfo />} />
        <Route path={ROUTES.TARGETS} element={<TargetsPage />} />
        <Route path={ROUTES.TARGET_INFO} element={<TargetInfo />} />
        <Route path={ROUTES.TARGETS_MED_REP} element={<TargetsPageMedRep />} />
        <Route
          path={ROUTES.TARGETS_MATCHED_CONTACTS}
          element={<MatchedContacts />}
        />
        <Route path={ROUTES.NEW_TARGET} element={<NewTargetPage />} />
        <Route path={ROUTES.CHANGE_TARGET} element={<ChangeTargetPage />} />
        <Route path={ROUTES.KPI} element={<KpiPage />} />
        <Route path={ROUTES.KPI_FREE_VISITS} element={<KpiFreeVisits />} />
        <Route path={ROUTES.TARGET_KPI} element={<KpiTargetItem />} />
        <Route path={ROUTES.PRESENTATION} element={<PresentationPage />} />
        <Route path={ROUTES.TASKS} element={<TasksPage />} />
        <Route path={ROUTES.NEW_TASK} element={<NewTaskPage />} />
        <Route path={ROUTES.NEW_PROJECT} element={<NewProjectPage />} />
        <Route path={ROUTES.TASK_INFO} element={<TaskInfoPage />} />
        <Route path={ROUTES.SUB_TASK_INFO} element={<SubTaskInfoPage />} />
        <Route path={ROUTES.PROJECTS} element={<ProjectsPage />} />
        <Route
          path={ROUTES.NEW_PROJECT_TASK}
          element={<NewProjectTaskPage />}
        />
        <Route path={ROUTES.PROJECT_INFO} element={<ProjectInfoPage />} />
        <Route path={ROUTES.ADMINISTRATION} element={<AdministrationPage />} />
        <Route path={ROUTES.ADMIN_DRUGS} element={<Drugs />} />
        <Route path={ROUTES.TARGET_REPORTS} element={<TargetReportsPage />} />
        <Route
          path={ROUTES.TARGET_REPORT_INFO}
          element={<TargetReportInfo />}
        />
        <Route
          path={ROUTES.NEW_TARGET_REPORT}
          element={<NewTargetReportPage />}
        />
        <Route
          path={ROUTES.NEW_EMPLOYEE}
          element={<AdministrationAddEmployee />}
        />
        <Route
          path={ROUTES.EMPLOYEES}
          element={<AdministrationEmployeeList />}
        />
        <Route path={ROUTES.NEW_BRICKS} element={<BrickNew />} />
        <Route path={ROUTES.BRICKS} element={<BrickList />} />
        <Route path={ROUTES.BRICK_INFO} element={<BrickInfo />} />
        <Route path={ROUTES.MEDRED} element={<MedRedList />} />
        <Route path={ROUTES.MEDRED_INFO} element={<MedRedPage />} />
        <Route path='*' element={<Navigate to={ROUTES.HOME} />} />
        <Route path={ROUTES.TEST} element={<Test />} />
      </Routes>
    );
  };

  return (
    <div className='App'>
      <ConfigProvider locale={locale}>
        {/*<BrowserRouter basename={process.env.REACT_APP_SUBDIR}>*/}
        <Routes>
          <Route path={ROUTES.MAIN} element={<MainPage />} />
          <Route
            path={ROUTES.FORGOT_PASSWORD}
            element={<ForgotPasswordPage />}
          />
          <Route path={ROUTES.VERSION} element={<VersionPage />} />
          <Route
            path={`${ROUTES.VIDEO_CALL}/:eventId`}
            element={<VideoCallPage />}
          />
          <Route
            path={`${ROUTES.SUBSCRIBE_VIDEO_CALL}/:eventId`}
            element={<VideoCallPage />}
          />
          <Route
            path='*'
            element={
              <ProtectedRoute>
                <InternalRoutes />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/*</BrowserRouter>*/}
      </ConfigProvider>
      <ModalError />
      <MessageComponent />
    </div>
  );
};
