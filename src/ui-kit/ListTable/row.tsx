import React, { FC } from 'react';
import { ISorting, OrderType } from './ListSorting';
import classNames from 'classnames';

interface IArray {
  title: string;
  key: OrderType;
  class_for_item: string;
}

interface IListSorting {
  array: IArray[];
  style: object;
  onClick?: () => void;
}

export const Row: FC<IListSorting> = (props) => {
  const { onClick, array } = props;
  return (
    <div
      className='bg-white-l1 br-6 pt-12 pb-12 pl-20 pr-20 mb-5'
      onClick={onClick}
    >
      {array.map(({ key, class_for_item }) => (
        <div className={`${classNames(class_for_item)} flex items-start`}>
          {key}
        </div>
      ))}
    </div>
  );
};
