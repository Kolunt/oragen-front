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

export const ListTable: FC<IListSorting> = (props) => {
  const { onClick, array } = props;
  return <div></div>;
};
