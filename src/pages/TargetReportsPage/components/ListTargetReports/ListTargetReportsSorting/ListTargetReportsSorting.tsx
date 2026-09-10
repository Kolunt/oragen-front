import React, { FC, memo } from 'react';
import { ColumnHeader } from 'ui-kit';
import './ListTargetReportsSorting.scss';

interface IListTargetReportsSorting {}

export const ListTargetReportsSorting: FC<IListTargetReportsSorting> = memo(
  (props) => {
    return (
      <ul className='ListTargetReportsSorting'>
        <li className='ListTargetReportsSorting__Item ListTargetReportsSorting__Item--Start'>
          <ColumnHeader title='Наименование' />
        </li>
        <li className='ListTargetReportsSorting__Item'>
          <ColumnHeader title='ID' />
        </li>
      </ul>
    );
  }
);
