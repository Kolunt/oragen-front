import React from 'react';
import { ListItemVisits } from './ListItemVisits';
import { PaginationFull } from 'components/PaginationFull/PaginationFull';
import { useUserStore } from 'store/useUserStore';
import classNames from 'classnames';
import { v1 } from 'uuid';
import { useVisitsGroupStore } from 'pages/VisitsPage/useVisitsGroupStore';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import './ListVisits.scss';

export const ListVisits = () => {
  const visits = useVisitsGroupStore((state) => state.visits);
  const currentPage = useVisitsGroupStore((state) => state.currentPage);
  const setCurrentPage = useVisitsGroupStore((state) => state.setCurrentPage);
  const pageSize = useVisitsGroupStore((state) => state.pageSize);
  const setPageSize = useVisitsGroupStore((state) => state.setPageSize);
  const numberOfVisits = useVisitsGroupStore((state) => state.numberOfVisits);
  const me = useUserStore((state) => state.me);
  const isMedRep = me.roles[0].id === 8;
  return (
    <div className='ListVisits flex-container relative'>
      <ul
        className={classNames(`ListHeader`, {
          ListHeader__MedRep: isMedRep,
        })}
      >
        <li className='ListHeader__Item ListHeader__Item--start'>Контакт</li>
        {!isMedRep && <li className='ListHeader__Item'>Исполнитель</li>}
        <li className='ListHeader__Item'>Специальность</li>
        <li className='ListHeader__Item'>Цикл</li>
        <li className='ListHeader__Item'>Адрес</li>
        <li className='ListHeader__Item'>Визиты</li>
      </ul>
      <ScrollBar>
        <div className='List'>
          {visits.map((visit) => {
            return <ListItemVisits key={v1()} visit={visit} />;
          })}
        </div>
      </ScrollBar>

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
