import React, { FC } from 'react';
import './ListEventsSorting.scss';

interface IListEventsSorting {}

export const ListEventsSorting: FC<IListEventsSorting> = (props) => {
  return (
    <ul className='ListEventsSorting'>
      <li className='ListEventsSorting__Item'>
        <span>Тип</span>
      </li>
      <li className='ListEventsSorting__Item'>
        <span>Название</span>
      </li>
      <li className='ListEventsSorting__Item'>
        <span>Описание</span>
      </li>
      <li className='ListEventsSorting__Item'>
        <span>Длительность (мин)</span>
      </li>
      <li className='ListEventsSorting__Item'>
        <span>Дата начала</span>
      </li>
      <li className='ListEventsSorting__Item'>
        <span>Дата завершения</span>
      </li>
      <li className='ListEventsSorting__Item'>
        <span>Кол-во участников</span>
      </li>
    </ul>
  );
};
