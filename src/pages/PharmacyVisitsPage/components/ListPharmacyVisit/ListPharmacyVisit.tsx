import React from 'react';
import classNames from 'classnames';
import { v1 } from 'uuid';
import { PaginationFull } from 'components';
import { useVisitsGroupPharmacyStore } from 'pages/PharmacyVisitsPage/useVisitsGroupPharmacy';
import { useUserStore } from 'store/useUserStore';
import { ListItemPharmacyVisit } from 'pages';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';
import './ListPharmacyVisit.scss';

export const ListPharmacyVisit = () => {
  const visits = useVisitsGroupPharmacyStore((state) => state.visits);
  const currentPage = useVisitsGroupPharmacyStore((state) => state.currentPage);
  const setCurrentPage = useVisitsGroupPharmacyStore(
    (state) => state.setCurrentPage
  );
  const pageSize = useVisitsGroupPharmacyStore((state) => state.pageSize);
  const setPageSize = useVisitsGroupPharmacyStore((state) => state.setPageSize);
  const numberOfVisits = useVisitsGroupPharmacyStore(
    (state) => state.numberOfVisits
  );
  const me = useUserStore((state) => state.me);
  const isMedRep = me.roles[0].id === 8;

  return (
    <div className='ListPharmacyVisit flex-container relative'>
      <ul
        className={classNames(`ListHeader`, {
          ListHeader__MedRep: isMedRep,
        })}
      >
        <li className='ListHeader__Item ListHeader__Item--start'>
          Организация
        </li>
        {!isMedRep && <li className='ListHeader__Item'>Исполнитель</li>}
        <li className='ListHeader__Item'>Цикл</li>
        <li className='ListHeader__Item'>Адрес</li>
        <li className='ListHeader__Item'>Визиты</li>
      </ul>
      <ScrollBar>
        <div className='List'>
          {visits.map((visit) => {
            return <ListItemPharmacyVisit key={v1()} visit={visit} />;
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
