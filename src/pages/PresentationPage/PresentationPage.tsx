import React from 'react';
import { Layout } from 'components/Layout/Layout';
import {
  PresentationDemo,
  PresentationFile,
  usePresentationStore,
} from 'pages';
import './PresentationPage.scss';
import { ROUTES } from '../../enums';
import { Button } from '../../ui-kit';
import { useNavigate } from 'react-router-dom';

export const PresentationPage = () => {
  const visit = usePresentationStore((state) => state.monitoredVisit);
  const navigate = useNavigate();
  return (
    <div className='PresentationPage'>
      <Layout>
        <div className='PresentationPage__Content'>
          <div className='Presentation'>
            {visit?.files && visit?.files.length > 0 ? (
              <PresentationFile />
            ) : (
              <div>Файлы не были прикреплены к визиту</div>
            )}
            <Button
              className='ButtonFinish mt-auto ml-auto'
              onClick={() => navigate(ROUTES.CONTACTS_INFO)}
            >
              Финиш
            </Button>
          </div>
        </div>
      </Layout>
    </div>
  );
};
