import React, { FC } from 'react';
import { ColumnHeader } from 'ui-kit';
import { useTargetsStore } from 'store/useTargetsStore';
import { getSortDirection } from 'utils';
import { TargetOrderType } from 'api/targetListApi';

interface IListTargetsSorting {}

export const ListTargetKpiSorting: FC<IListTargetsSorting> = (props) => {
  const sorting = useTargetsStore((state) => state.sorting);
  const setSorting = useTargetsStore((state) => state.setSorting);

  const changeOrderSort = (value: TargetOrderType) => {
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
    <div className='listTargetKpi mb-20 pl-20 pr-20'>
      <div className='flex items-start'>
        <ColumnHeader
          title='Название'
          callBack={() => changeOrderSort('name')}
          isShowArrow={sorting.order === 'name'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </div>
      <div className='flex items-center justify-center'>
        <ColumnHeader
          title='Препарат'
          // callBack={() => changeOrderSort('position')}
          // isShowArrow={sorting.order === 'position'}
          // directionArrow={sorting.orderBy === 'desc'}
        />
      </div>
      <div className='flex items-center justify-center'>
        <ColumnHeader
          title='Начать'
          callBack={() => changeOrderSort('started_at')}
          isShowArrow={sorting.order === 'started_at'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </div>
      <div className='flex items-center justify-center'>
        <ColumnHeader
          title='Закончить'
          callBack={() => changeOrderSort('finished_at')}
          isShowArrow={sorting.order === 'finished_at'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </div>
      <div className='flex items-center justify-center'>
        <ColumnHeader
          title='Визиты'
          // callBack={() => changeOrderSort('visits_count')}
          // isShowArrow={sorting.order === 'visits_count'}
          // directionArrow={sorting.orderBy === 'desc'}
        />
      </div>
    </div>
  );
};
