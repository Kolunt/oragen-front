import React from 'react';
import { ColumnHeader } from '../../../../ui-kit';
import { useVisitsStore } from '../../../../store/useVisitsStore';
import { getSortDirection } from '../../../../utils';
import { VisitOrderType } from '../../../../api/visitsApi';
import './style.scss';

export const ListVisitKpiSorting = () => {
  const sorting = useVisitsStore((state) => state.sorting);
  const setSorting = useVisitsStore((state) => state.setSorting);

  const changeOrderSort = (value: VisitOrderType) => {
    if (sorting.order === value) {
      setSorting({
        order: value,
        orderBy: getSortDirection(sorting.orderBy),
      });
    } else {
      setSorting({ order: value, orderBy: sorting.orderBy });
    }
  };
  return (
    <div className='listVisitKpi mb-20 pr-20 pl-20'>
      <div className='flex items-start'>
        <ColumnHeader
          title='ФИО'
          callBack={() => changeOrderSort('full_name')}
          isShowArrow={sorting.order === 'full_name'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </div>
      <div className='flex items-center justify-center'>
        <ColumnHeader
          title='Специальность'
          callBack={() => changeOrderSort('position')}
          isShowArrow={sorting.order === 'position'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </div>
      <div className='flex items-center justify-center'>
        <ColumnHeader
          title='Место работы'
          callBack={() => changeOrderSort('company')}
          isShowArrow={sorting.order === 'company'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </div>
      <div className='flex items-center justify-center'>
        <ColumnHeader
          title='Визиты'
          // callBack={() => changeOrderSort('finished_at')}
          // isShowArrow={sorting.order === 'finished_at'}
          // directionArrow={sorting.orderBy === 'desc'}
        />
      </div>
    </div>
  );
};
