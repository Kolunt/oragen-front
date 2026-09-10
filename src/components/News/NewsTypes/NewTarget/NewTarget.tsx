import React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { DateFormats, ROUTES } from 'enums';
import { Icon } from 'ui-kit';
import './NewTarget.scss';
import '../styles.scss';
import { ITargetLocal } from 'api/targetListApiLocal';
import { v1 } from 'uuid';

interface INewTarget {
  target: ITargetLocal;
}

export const NewTarget = ({ target }: INewTarget) => {
  const navigate = useNavigate();
  return (
    <div className='newItem' onClick={() => navigate(ROUTES.TARGETS)}>
      <div className='flex'>
        <div className='icon'>
          <Icon type='NavFileUser' />
        </div>
        <div className=''>
          <div className=''>
            <h4 className='TypeName borderNone separator-bottom'>
              Добавлены {target.planned_visits_count} визитов по таргету{' '}
              {target.parent_target_list_full_info?.name}
            </h4>
            <div className='flex'>
              <span className='mr-5'>
                от{' '}
                {dayjs(target?.created_at).format(DateFormats.APP_DATE_FORMAT)}
              </span>
              <div className='color-tertiary-l3'>
                созданы {dayjs(target?.created_at).locale('ru').fromNow()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <span className='color-tertiary-l3'>Цикл:</span> {target?.drug.name}
      </div>
      <div>
        <div className='color-tertiary-l3'>Врачи:</div>
        {target?.matched_contacts?.map(({ full_name }) => (
          <div key={v1()}>{full_name}</div>
        ))}
      </div>
    </div>
  );
};
