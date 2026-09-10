import React, { FC, memo } from 'react';
import { ColumnHeader } from 'ui-kit';
import { getSortDirection } from 'utils';
import { useBrickStore } from 'store/useBrickStore';
import { BrickOrderType } from 'api/brickApi';
import '../BrickList.scss';

interface IListSorting {}

export const ListBricksSorting: FC<IListSorting> = memo((props) => {
  const {} = props;
  const sorting = useBrickStore((state) => state.sorting);
  const setSorting = useBrickStore((state) => state.setSorting);

  const changeOrderSort = (value: BrickOrderType) => {
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
    <ul className='list mb-18'>
      <li className='flex items-start'>
        <ColumnHeader
          title='Название'
          callBack={() => changeOrderSort('name')}
          isShowArrow={sorting.order === 'name'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </li>
      <li className='flex items-center justify-center'>Тип</li>
      <li className='flex items-center justify-center'>
        <ColumnHeader
          title='Ответственный'
          // callBack={() => changeOrderSort('type')}
          // isShowArrow={sorting.order === 'type'}
          // directionArrow={sorting.orderBy === 'desc'}
        />
      </li>
    </ul>
  );
});
