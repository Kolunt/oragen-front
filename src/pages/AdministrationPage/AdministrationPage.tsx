import React from 'react';
import { Layout } from 'components/Layout/Layout';
import { Title } from 'ui-kit';
import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTES, SideMenuTypes } from 'enums';
import { useUserStore } from 'store/useUserStore';
import { displayCheck } from 'utils';
import './AdministrationPage.scss';

export const AdministrationPage = () => {
  const myRole = useUserStore((state) => state.me.roles[0].name);
  const navigate = useNavigate();

  if (!displayCheck(SideMenuTypes.ADMIN, myRole)) {
    return <Navigate to={ROUTES.HOME} />;
  }

  return (
    <div className='AdministrationPage'>
      <Layout>
        <div className='mb-20'>
          <Title>Администрирование</Title>
        </div>
        <ul className='AdministrationPage__List'>
          <li className='ListItem' onClick={() => navigate(ROUTES.EMPLOYEES)}>
            Сотрудники
          </li>
          <li className='ListItem' onClick={() => navigate(ROUTES.BRICKS)}>
            Брики
          </li>
          <li className='ListItem' onClick={() => navigate(ROUTES.ADMIN_DRUGS)}>
            Препараты
          </li>
          <li className='ListItem'>В разработке...</li>
          <li className='ListItem'>В разработке...</li>
          <li className='ListItem'>В разработке...</li>
          <li className='ListItem'>В разработке...</li>
        </ul>
      </Layout>
    </div>
  );
};
