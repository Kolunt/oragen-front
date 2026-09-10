import React from 'react';
import { useVisitsStore } from 'store/useVisitsStore';
import { PaginationFull } from 'components';
import { ListItemAllVisits } from 'pages';
import './ListAllVisits.scss';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';

export const ListAllVisits = () => {
  const visits = useVisitsStore((state) => state.visitsByContact);
  const currentPage = useVisitsStore((state) => state.currentPage);
  const setCurrentPage = useVisitsStore((state) => state.setCurrentPage);
  const pageSize = useVisitsStore((state) => state.pageSize);
  const setPageSize = useVisitsStore((state) => state.setPageSize);
  const numberOfVisits = useVisitsStore((state) => state.numberOfVisits);
  return (
    <div className='ListAllVisits flex-container relative hidden'>
      <ul className='ListHeader'>
        <li className='ListHeader__Item ListHeader__Item--start'>
          Дата визита
        </li>
        <li className='ListHeader__Item'>Препарат</li>
        <li className='ListHeader__Item'>Тип</li>
        <li className='ListHeader__Item'>Состояние</li>
        <li className='ListHeader__Item'>Статус</li>
        <li className='ListHeader__Item'>Исполнитель</li>
        <li className='ListHeader__Item'>Комментарии</li>
      </ul>

      <ScrollBar>
        {visits.map((visit) => {
          return <ListItemAllVisits key={visit.id} visit={visit} />;
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
