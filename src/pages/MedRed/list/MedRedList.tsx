import React, { useEffect, useState } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Title } from 'ui-kit';
import { fetchRoleUsers } from 'api/rolesApi';
import { NavLink } from 'react-router-dom';
import { IUser } from 'api/userApi';
import './style.scss';
import { URL_NAME } from '../../../enums';

export const MedRedList = () => {
  const [data, setData] = useState<IUser[]>([]);

  useEffect(() => {
    (async () => {
      try {
        // @ts-ignore
        const { data } = await fetchRoleUsers({}, { role_id: 8 });
        setData(data.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);
  return (
    <Layout>
      <Title className='mb-20'>Список медицинских представителей</Title>
      <div className='mb-10 bg-background-l8 br-10 pb-12 pl-20 pr-20'>
        <div className='grid-medred-list pt-12 pb-12 pl-20 pr-20 color-secondary-l2'>
          <div>Имя</div>
          <div>ID</div>
        </div>
        {data?.map(({ id, name }) => (
          <div
            key={id}
            className='mb-5 bg-white-l1 br-6 pt-12 pb-12 pl-20 pr-20 grid-medred-list'
          >
            <NavLink to={`/${URL_NAME.MEDRED_INFO}/${id}`}>{name}</NavLink>
            <div>{id}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
};
