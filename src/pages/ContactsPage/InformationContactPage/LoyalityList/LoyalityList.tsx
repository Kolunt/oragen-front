import React, { FC } from 'react';
import { IDrug } from 'api/drugsApi';
import './style.scss';
import { LoyalityItem } from './LoyalityItem';
import { ScrollBar } from 'ui-kit/ScrollBar/ScrollBar';

interface ILoyalityList {
  data: IDrug[];
}

export const LoyalityList: FC<ILoyalityList> = ({ data }) => {
  return (
    <div className='flex-container hidden'>
      <div className='loyalityList mb-10 pt-12 pb-12 pr-20 pl-20 color-secondary-l2 relative'>
        <div>Название лекарства</div>
        <div className='text-center'>Лояльность</div>
      </div>
      <ScrollBar>
        {data.map((item) => (
          <LoyalityItem data={item} />
        ))}
      </ScrollBar>
    </div>
  );
};
