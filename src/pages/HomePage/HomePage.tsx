import React from 'react';
import { Kpi, KpiCommon, News } from 'components';
import { Layout } from 'components/Layout/Layout';
import { Title } from 'ui-kit';
import 'react-calendar/dist/Calendar.css';
import { UpcomingUserEvents } from './Components/BlockUpcomingUserEvents/UpcomingUserEvents';
import { Navigate } from 'react-router-dom';
import { useUserStore } from 'store/useUserStore';
import { RoleTypes, ROUTES } from 'enums';
import './HomePage.scss';

export const HomePage = () => {
  const me = useUserStore((state) => state.me);
  const myRole = me?.roles ? me.roles[0].name : RoleTypes.HAVE_NO_ROLE;

  if (myRole === RoleTypes.CALL_CENTER) {
    return <Navigate to={ROUTES.APPLICATIONS} />;
  }

  return (
    <div className='HomePage h-full'>
      <Layout>
        <div className='HomePage__Content justify-center'>
          <UpcomingUserEvents />
          <div>
            <div className='HomePage__Block'>
              {myRole === RoleTypes.MED_REP && (
                <div className='KpiBlock'>
                  <Title className='mb-15 text-center'>
                    KPI Циклового плана
                  </Title>
                  <Kpi isCommonKpi={true} />
                </div>
              )}
            </div>
          </div>
          <div className='NewsBlock'>
            <News />
          </div>
        </div>
      </Layout>
      {/*<ModalCardContact />*/}
      {/*<ModalCardOrganization />*/}
    </div>
  );
};
