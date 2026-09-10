import React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { DateFormats, ROUTES } from 'enums';
import { Icon } from 'ui-kit';
import './NewVisit.scss';
import { IVisit } from '../../../../api/visitsApi';
import '../styles.scss';

interface INewVisit {
  visit: IVisit;
}

export const NewVisit = ({ visit }: INewVisit) => {
  const navigate = useNavigate();
  return (
    <div className='newItem' onClick={() => navigate(ROUTES.VISITS)}>
      <div className='flex items-center separator-bottom'>
        <div className='icon'>
          <Icon type='NavFileUser' />
        </div>
        <div className=''>
          <div className='flex items-center'>
            <h4 className='TypeName'>Визит</h4>
            <span className=''>
              от {dayjs(visit?.created_at).format(DateFormats.APP_DATE_FORMAT)}
            </span>
          </div>
          <div className='color-tertiary-l3'>
            создан {dayjs(visit?.created_at).locale('ru').fromNow()}
          </div>
        </div>
      </div>
      <div>
        <span className='color-tertiary-l3'>Цикл:</span> {visit?.drug.name}
      </div>
      <div>
        <span className='color-tertiary-l3'>Дата визита:</span>{' '}
        {dayjs(visit?.planned_at).format(DateFormats.APP_DATE_FORMAT)}
      </div>
    </div>
  );
};
