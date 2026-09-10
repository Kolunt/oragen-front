import React, { FC, useMemo } from 'react';
import { IDrug } from '../../../../api/drugsApi';
import './style.scss';

interface ILoyalityItem {
  data: IDrug;
}

export const LoyalityItem: FC<ILoyalityItem> = ({ data }) => {
  const { id, name, loyality } = data;

  let symbol = '';

  switch (true) {
    // @ts-ignore
    case loyality < 0:
      symbol = '-';
      break;
    // @ts-ignore
    case loyality >= 0 && loyality <= 24:
      symbol = 'D';
      break;
    // @ts-ignore
    case loyality >= 25 && loyality <= 49:
      symbol = 'C';
      break;
    // @ts-ignore
    case loyality >= 50 && loyality <= 74:
      symbol = 'B';
      break;
    // @ts-ignore
    case loyality >= 75 && loyality <= 100:
      symbol = 'A';
      break;
    default:
      symbol = '';
  }
  return (
    <div key={id} className='loyalityList mb-10 pr-20 pl-20'>
      <span className=''>{name}</span>
      <span className='text-center'>{symbol}</span>
    </div>
  );
};
