import React from 'react';
import { ColumnHeader } from 'ui-kit';
import './TargetsMedRepSorting.scss';

export const TargetsMedRepSorting = () => {
  return (
    <ul className='TargetsMedRepSorting mb-10'>
      <li className='flex items-start'>
        <ColumnHeader title='Ответственный' />
      </li>
      <li className='flex items-center justify-center'>
        <ColumnHeader title='Цикл' />
      </li>
      <li className='flex items-center justify-center'>
        <ColumnHeader title='Специальность' />
      </li>
      {/*      <li className='flex items-center justify-center'>
        <ColumnHeader
          title='Визиты'
        />
      </li>*/}
      <li className='flex items-center justify-center'>
        <ColumnHeader title='Контакты' />
      </li>
      <li className='flex items-center justify-center'>
        <ColumnHeader title='Статус' />
      </li>
    </ul>
  );
};
