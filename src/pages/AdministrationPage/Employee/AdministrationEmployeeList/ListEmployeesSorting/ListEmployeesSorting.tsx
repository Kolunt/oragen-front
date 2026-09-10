import React, { FC, memo } from 'react';
import { ColumnHeader } from 'ui-kit';
import { useUserStore } from 'store/useUserStore';
import { getSortDirection } from 'utils';
import { UserOrderType } from 'api/userApi';
import './ListEmployeesSorting.scss';

export interface IListSorting {}

const ListEmployeesSorting: FC<IListSorting> = memo((props) => {
  const {} = props;
  const sorting = useUserStore((state) => state.sorting);
  const setSorting = useUserStore((state) => state.setSorting);

  const changeOrderSort = (value: UserOrderType) => {
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
    <ul className='ListSorting mb-10'>
      <li className='flex items-start'>
        <ColumnHeader
          title='ФИО'
          callBack={() => changeOrderSort('name')}
          isShowArrow={sorting.order === 'name'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </li>
      <li className='flex items-center justify-center'>
        {/*<ColumnHeader*/}
        {/*    title='Адрес'*/}
        {/*    callBack={() => changeOrderSort('roles')}*/}
        {/*    isShowArrow={sorting.order === 'roles'}*/}
        {/*    directionArrow={sorting.orderBy === 'desc'}*/}
        {/*/>*/}
      </li>
      <li className='flex items-center justify-center'>
        <ColumnHeader
          title='Адрес'
          callBack={() => changeOrderSort('email')}
          isShowArrow={sorting.order === 'email'}
          directionArrow={sorting.orderBy === 'desc'}
        />
      </li>
    </ul>
  );
});

export default ListEmployeesSorting;
