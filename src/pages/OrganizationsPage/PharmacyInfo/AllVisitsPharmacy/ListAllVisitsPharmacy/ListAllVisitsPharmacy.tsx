import React from 'react';
import { PaginationFull } from 'components';
import { useVisitsPharmacyStore } from 'store/useVisitsPharmacyStore';
import { ListItemAllVisitsPharmacy } from 'pages';
import './ListAllVisitsPharmacy.scss';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';

export const ListAllVisitsPharmacy = () => {
  const visits = useVisitsPharmacyStore((state) => state.visitsByOrganization);
  const currentPage = useVisitsPharmacyStore((state) => state.currentPage);
  const setCurrentPage = useVisitsPharmacyStore(
    (state) => state.setCurrentPage
  );
  const pageSize = useVisitsPharmacyStore((state) => state.pageSize);
  const setPageSize = useVisitsPharmacyStore((state) => state.setPageSize);
  const numberOfVisits = useVisitsPharmacyStore(
    (state) => state.numberOfVisits
  );
  return (
    <div className='ListAllVisitsPharmacy flex-container relative hidden'>
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
          return <ListItemAllVisitsPharmacy key={visit.id} visit={visit} />;
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
