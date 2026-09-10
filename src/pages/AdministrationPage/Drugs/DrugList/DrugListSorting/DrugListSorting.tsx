import React, { FC } from 'react';
import { ColumnHeader } from 'ui-kit';
import { DrugOrderType } from 'api/drugsApi';
import { useDrugsStore } from 'store/useDrugsStore';
import { getSortAdminDirection } from 'utils/getSortAdminDirection';
import './DrugListSorting.scss';
import { getSortDirection } from 'utils';

interface IDrugListSorting {}

export const DrugListSorting: FC<IDrugListSorting> = (props) => {
  const {} = props;
  const sorting = useDrugsStore((state) => state.sorting);
  const setSorting = useDrugsStore((state) => state.setSorting);

  const changeOrderSort = (value: DrugOrderType) => {
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
    <ul className='DrugListSorting'>
      <li className='DrugListSorting__Item'>
        <ColumnHeader
          title='Наименование'
          callBack={() => changeOrderSort('name')}
          isShowArrow={sorting.order === 'name'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </li>
      <li className='DrugListSorting__Item' />
    </ul>
  );
};
