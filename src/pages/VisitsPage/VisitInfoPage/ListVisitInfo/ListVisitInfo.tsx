import React from 'react';
import { useUserStore } from 'store/useUserStore';
import { useVisitsStore } from 'store/useVisitsStore';
import classNames from 'classnames';
import { PaginationFull } from 'components';
import { ListVisitInfoItem } from 'pages/VisitsPage/VisitInfoPage/ListVisitInfo/ListVisitInfoItem';
import './ListVisitInfo.scss';

export const ListVisitInfo = () => {
  const visits = useVisitsStore((state) => state.visitsByContact);
  const currentPage = useVisitsStore((state) => state.currentPage);
  const setCurrentPage = useVisitsStore((state) => state.setCurrentPage);
  const pageSize = useVisitsStore((state) => state.pageSize);
  const setPageSize = useVisitsStore((state) => state.setPageSize);
  const numberOfVisits = useVisitsStore((state) => state.numberOfVisits);
  const me = useUserStore((state) => state.me);
  const isMedRep = me.roles[0].id === 8;
  return (
    <div className='ListVisitInfo'>
      <ul
        className={classNames(`ListHeader`, {
          // ListHeader__MedRep: isMedRep,
        })}
      >
        <li className='ListHeader__Item ListHeader__Item--start'>
          Дата визита
        </li>
        {/*{!isMedRep && <li className='ListHeader__Item'>Исполнитель</li>}*/}
        <li className='ListHeader__Item'>Тип</li>
        <li className='ListHeader__Item'>Потенциал</li>
        <li className='ListHeader__Item'>Лояльность</li>
        <li className='ListHeader__Item'>Статус</li>
        <li className='ListHeader__Item'>Комментарии</li>
      </ul>

      <div className='List'>
        {visits.map((visit) => {
          return <ListVisitInfoItem key={visit.id} visit={visit} />;
        })}
      </div>

      <PaginationFull
        currentPage={currentPage}
        numberOfElements={numberOfVisits}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};
