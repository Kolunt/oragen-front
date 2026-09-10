import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from 'components/Layout/Layout';
import { Title } from 'ui-kit';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUsers } from 'api';
import { ROUTES } from 'enums';
import { Breadcrumbs } from 'ui-kit/Breadcrumbs/Breadcrumbs';
import { IUser } from 'api/userApi';
import { RouteMap } from './Components/RouteMap/RouteMap';
import { fetchGeolocation } from '../../../api/geolocationApi';
import { DatePicker } from 'antd';
// import dayjs, { type Dayjs } from 'dayjs'

const { RangePicker } = DatePicker;

export const MedRedPage = () => {
  const { id_user } = useParams();
  // @ts-ignore
  const [data, setData] = useState<IUser>({});
  const [geotargetingData, setGeotargetingData] = useState<any[]>([]);
  const [dateGeotargeting, setDateGeotargeting] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // @ts-ignore
        const { data } = await fetchUsers({}, { id: id_user });
        // @ts-ignore
        setData(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id_user]);

  useEffect(() => {
    (async () => {
      try {
        // @ts-ignore
        if (dateGeotargeting && dateGeotargeting?.length > 0) {
          const { data } = await fetchGeolocation({
            user_id: id_user,
            // @ts-ignore
            placed_after: dateGeotargeting[0].toISOString(),
            // @ts-ignore
            placed_before: dateGeotargeting[1].toISOString(),
          });
          setGeotargetingData(data.data);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id_user, dateGeotargeting]);

  const geotargetingForMap = useMemo<[number, number][]>(() => {
    return geotargetingData?.map(({ geotag }) => [
      Number(geotag.split(' ')[0]),
      Number(geotag.split(' ')[1]),
    ]);
  }, [geotargetingData]);
  return (
    <Layout>
      <Breadcrumbs
        links={[
          { title: 'Список медрепов', callback: () => navigate(ROUTES.MEDRED) },
          { title: `${data?.first_name} ${data?.name}` },
        ]}
      />
      <Title className='mb-20'>
        <span className='pr-5'>{data?.first_name}</span>
        <span className='pr-5'>{data?.name}</span>
        <span className='pr-5'>{data?.last_name}</span>
      </Title>
      <RangePicker
        // @ts-ignore
        onChange={(value) => setDateGeotargeting(value)}
        className='CustomDatePicker mb-20'
        format={'DD.MM.YYYY HH:mm'}
        showTime={{ format: 'HH:mm', minuteStep: 5 }}
        superNextIcon={false}
        superPrevIcon={false}
        style={{ width: '300px' }}
      />
      <RouteMap
        geotargetingData={geotargetingData}
        geotargeting={geotargetingForMap}
      />
    </Layout>
  );
};
