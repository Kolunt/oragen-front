import React from 'react';
import { PaginationFull } from 'components';
import {
  ListItemCurrentVisitsPharmacy,
  useCurrentVisitsPharmacyStore,
} from 'pages';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import classNames from 'classnames';
import { RoleTypes } from 'enums';
import { useUserStore } from 'store/useUserStore';
import './ListCurrentVisitsPharmacy.scss';

export const ListCurrentVisitsPharmacy = () => {
  const myRole = useUserStore((state) => state.me.roles[0].name);
  const visits = useCurrentVisitsPharmacyStore((state) => state.visits);
  const currentPage = useCurrentVisitsPharmacyStore(
    (state) => state.currentPage
  );
  const setCurrentPage = useCurrentVisitsPharmacyStore(
    (state) => state.setCurrentPage
  );
  const pageSize = useCurrentVisitsPharmacyStore((state) => state.pageSize);
  const setPageSize = useCurrentVisitsPharmacyStore(
    (state) => state.setPageSize
  );
  const numberOfVisits = useCurrentVisitsPharmacyStore(
    (state) => state.numberOfVisits
  );

  return (
    <div className='ListCurrentVisitsPharmacy flex-container relative hidden'>
      <ul
        className={classNames('ListHeader', {
          ListHeader__medRep: myRole === RoleTypes.MED_REP,
        })}
      >
        <li className='ListHeader__Item ListHeader__Item--start'>Дата</li>
        <li className='ListHeader__Item'>Препарат</li>
        <li className='ListHeader__Item'>Состояние</li>
        <li className='ListHeader__Item'>Статус</li>
        <li className='ListHeader__Item'>Файлы</li>
        <li className='ListHeader__Item'>Отчет</li>
        <li className='ListHeader__Item'>Комментарии</li>
        <li className='ListHeader__Item'>Участники</li>
        <li className='ListHeader__Item'>Генерация</li>
      </ul>

      <ScrollBar>
        {visits.map((visit) => {
          return <ListItemCurrentVisitsPharmacy key={visit.id} visit={visit} />;
        })}
      </ScrollBar>

      <PaginationFull
        className='mt-20'
        currentPage={currentPage}
        numberOfElements={numberOfVisits}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};
