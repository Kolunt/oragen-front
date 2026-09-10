import React from 'react';
import { Layout } from 'components/Layout/Layout';
import { Button, Icon } from 'ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'enums';
import { useGeoTargetingStore } from 'store/useGeoTargetingStore';
import 'pages/GeoTargetingPage/GeoTargetingInfoPage/GeoTargetingInfoPage.scss';

export const GeoTargetingInfoPage = () => {
  const monitoredGeoTarget = useGeoTargetingStore(
    (state) => state.monitoredGeoTarget
  );
  const navigate = useNavigate();

  return (
    <div className='GeoTargetingInfoPage'>
      <Layout>
        <div className='GeoTargetingInfoPage__Header'>
          <div className='Breadcrumbs'>
            <Icon type='ArrowLeft' />
            <Link to={ROUTES.GEO_TARGETING}>
              <span>Геотаргетинг</span>
            </Link>
            <span>/</span>
            <span>{monitoredGeoTarget.fullName}</span>
          </div>
        </div>
        <div className='GeoTargetingInfoPage__Content'>
          <div className='Map'>
            <iframe
              className='CustomMap'
              src='https://yandex.ru/map-widget/v1/?ll=37.495626%2C55.798116&mode=whatshere&whatshere%5Bpoint%5D=37.495626%2C55.798115&whatshere%5Bzoom%5D=17&z=17'
            />
          </div>
          <div className='Card'>
            <div className='Card__Header'>
              <span>Данные</span>
            </div>
            <div className='Card__Main'>
              <ul className='List'>
                <li className='List__Item'>
                  <span>Медицинский представитель:</span>
                  {monitoredGeoTarget.fullName}
                </li>
                <li className='List__Item'>
                  <span>Специалист:</span>
                  Маргаритова Маргарита Маргаритовна
                </li>
                <li className='List__Item'>
                  <span>Адрес:</span>
                  г. Москва, Писцовая, д. 10
                </li>
                <li className='List__Item'>
                  <span>Тип:</span>Аптека
                </li>
                <li className='List__Item'>
                  <span>Координаты:</span>55.797842, 37.495884
                </li>
              </ul>
            </div>

            <div className='Card__Footer'>
              <Button
                className='ButtonStart'
                typeIconEnd='VisitInfoArrowRight'
                onClick={() => navigate(ROUTES.GEO_TARGETING)}
              >
                К списку
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
