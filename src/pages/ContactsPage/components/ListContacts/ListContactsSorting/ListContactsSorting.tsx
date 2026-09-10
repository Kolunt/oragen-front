import React, { FC, memo } from 'react';
import { ColumnHeader } from 'ui-kit';
import { ContactOrderType } from 'api/contactApi';
import './ListContactsSorting.scss';

interface IListContactsSorting {
  changeOrderSort: (sortingOrder: ContactOrderType) => void;
  sortingOrder: string;
  sortingOrderBy: string;
}

export const ListContactsSorting: FC<IListContactsSorting> = memo((props) => {
  const { changeOrderSort, sortingOrderBy, sortingOrder } = props;
  return (
    <ul className='ListContactsSorting'>
      <li className='ListContactsSorting__Item ListContactsSorting__Item--Start'>
        <ColumnHeader
          title='ФИО'
          callBack={() => changeOrderSort('full_name')}
          isShowArrow={sortingOrder === 'full_name'}
          directionArrow={sortingOrderBy === 'desc'}
        />
      </li>
      <li className='ListContactsSorting__Item'>
        <ColumnHeader
          title='Специальность'
          callBack={() => changeOrderSort('position')}
          isShowArrow={sortingOrder === 'position'}
          directionArrow={sortingOrderBy === 'desc'}
        />
      </li>
      <li className='ListContactsSorting__Item'>
        <ColumnHeader
          title='Тип'
          callBack={() => changeOrderSort('organization_type')}
          isShowArrow={sortingOrder === 'organization_type'}
          directionArrow={sortingOrderBy === 'desc'}
        />
      </li>
      <li className='ListContactsSorting__Item'>
        <ColumnHeader
          title='Адрес'
          callBack={() => changeOrderSort('address')}
          isShowArrow={sortingOrder === 'address'}
          directionArrow={sortingOrderBy === 'desc'}
        />
      </li>
    </ul>
  );
});
