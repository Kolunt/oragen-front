import React, { FC } from 'react';
import { ColumnHeader } from '../ColumnHeader/ColumnHeader';
import { getSortDirection } from '../../utils';
import { OrderByType } from '../../api/contactApi';
import classNames from 'classnames';

export type OrderType = 'name' | 'started_at' | 'finished_at' | 'visits_count';

export interface ISorting {
  order: OrderType;
  orderBy: OrderByType;
}

interface IArray {
  title: string;
  key: OrderType;
  class_for_item: string;
}

interface IListSorting {
  array: IArray[];
  setSorting: (sorting: ISorting) => void;
  style: object;
  sorting: ISorting;
}

const ListSorting: FC<IListSorting> = (props) => {
  const { style, array, sorting, setSorting } = props;

  const changeOrderSort = (value: OrderType) => {
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
    <div className='flex'>
      {array.map(({ title, key, class_for_item }) => (
        <div className={`${classNames(class_for_item)} flex items-start`}>
          <ColumnHeader
            title={title}
            callBack={() => changeOrderSort(key)}
            isShowArrow={sorting.order === key}
            directionArrow={sorting.orderBy === 'desc'}
          />
        </div>
      ))}
    </div>
  );
};

export default ListSorting;
