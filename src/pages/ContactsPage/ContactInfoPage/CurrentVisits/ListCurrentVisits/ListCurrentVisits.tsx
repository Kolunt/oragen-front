import React from 'react';
import { ListItemCurrentVisits, useCurrentVisitsStore } from 'pages';
import { PaginationFull } from 'components';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import './ListCurrentVisits.scss';
import { useUserStore } from 'store/useUserStore';
import classNames from 'classnames';
import { RoleTypes } from 'enums';

export const ListCurrentVisits = () => {
  const myRole = useUserStore((state) => state.me.roles[0].name);
  const visits = useCurrentVisitsStore((state) => state.visits);
  const currentPage = useCurrentVisitsStore((state) => state.currentPage);
  const setCurrentPage = useCurrentVisitsStore((state) => state.setCurrentPage);
  const pageSize = useCurrentVisitsStore((state) => state.pageSize);
  const setPageSize = useCurrentVisitsStore((state) => state.setPageSize);
  const numberOfVisits = useCurrentVisitsStore((state) => state.numberOfVisits);
  return (
    <div className='ListCurrentVisits flex-container relative hidden'>
      <ul
        className={classNames('ListHeader', {
          ListHeader__medRep: myRole === RoleTypes.MED_REP,
        })}
      >
        <li className='ListHeader__Item ListHeader__Item--start'>Дата</li>
        <li className='ListHeader__Item'>Препарат</li>
        <li className='ListHeader__Item'>Тип</li>
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
          return <ListItemCurrentVisits key={visit.id} visit={visit} />;
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
