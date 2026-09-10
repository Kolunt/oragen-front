import React from 'react';
import { ColumnHeader } from 'ui-kit';
import './MatchedContactsSorting.scss';

export const MatchedContactsSorting = () => {
  return (
    <ul className='MatchedContactsSorting'>
      <li className='flex items-start'>
        <ColumnHeader title='Контакт' />
      </li>
      <li className='flex items-center justify-center'>
        <ColumnHeader title='Специальность' />
      </li>
      <li className='flex items-center justify-center'>
        <ColumnHeader title='Цикл' />
      </li>
      <li className='flex items-center justify-center'>
        <ColumnHeader title='Адрес' />
      </li>
      <li className='flex items-center justify-center'>
        <ColumnHeader title='Потенциал' />
      </li>
      <li className='flex items-center justify-center'>
        <ColumnHeader title='Лояльность' />
      </li>
      <li className='flex items-center justify-center'>
        <ColumnHeader title='Визиты' />
      </li>
      <li className='flex items-center justify-center'>
        <ColumnHeader title='Статус' />
      </li>
    </ul>
  );
};
