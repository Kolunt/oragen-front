import React, { useEffect, useState } from 'react';
import { CheckboxRound, InputForm } from 'ui-kit';
import { v1 } from 'uuid';
import { useReportStore } from 'components/Report/index';
import './Loyalty.scss';

export type LoyaltyType = 'A' | 'B' | 'C' | 'D';

export interface ILoyalty {
  id: number;
  value: LoyaltyType;
}

const loyalty: ILoyalty[] = [
  { id: 0, value: 'A' },
  { id: 1, value: 'B' },
  { id: 2, value: 'C' },
  { id: 3, value: 'D' },
];

export const Loyalty = () => {
  const setLoyalty = useReportStore((state) => state.setLoyalty);
  const [currentLoyalty, setCurrentLoyalty] = useState<ILoyalty>(loyalty[0]);

  useEffect(() => {
    let value = 0;
    if (currentLoyalty.value === 'A') value = 88;
    if (currentLoyalty.value === 'B') value = 63;
    if (currentLoyalty.value === 'C') value = 38;
    if (currentLoyalty.value === 'D') value = 13;
    setLoyalty(value);
  }, [currentLoyalty]);

  const onChangeLoyalty = (index: number) => {
    setCurrentLoyalty(loyalty[index]);
  };

  return (
    <div className='Loyalty'>
      <InputForm
        className='CustomInput'
        value={'Лояльность'}
        onChange={() => {}}
        label='Вопрос'
      />
      {loyalty.map((item, index) => (
        <div key={v1()} className='mb-10 flex items-center gap-x-20'>
          <div onClick={() => onChangeLoyalty(index)}>
            <CheckboxRound
              className='CustomCheckboxRound'
              isChecked={index === currentLoyalty.id}
              onChange={() => {}}
            />
          </div>
          <InputForm
            className='w-full'
            value={item.value}
            onChange={() => {}}
          />
        </div>
      ))}
    </div>
  );
};
