import React, { useEffect, useState } from 'react';
import { LoyaltyType } from 'components/Report/sections/Loyalty';
import { useReportStore } from 'components/Report/useReportStore';
import { CheckboxRound, InputForm } from 'ui-kit';
import { v1 } from 'uuid';
import './Potential.scss';

export interface IPotential {
  id: number;
  value: LoyaltyType;
}

const potential: IPotential[] = [
  { id: 0, value: 'A' },
  { id: 1, value: 'B' },
  { id: 2, value: 'C' },
  { id: 3, value: 'D' },
];

export const Potential = () => {
  const setPotential = useReportStore((state) => state.setPotential);
  const [currentPotential, setCurrentPotential] = useState<IPotential>(
    potential[0]
  );

  useEffect(() => {
    let value = 0;
    if (currentPotential.value === 'A') value = 88;
    if (currentPotential.value === 'B') value = 63;
    if (currentPotential.value === 'C') value = 38;
    if (currentPotential.value === 'D') value = 13;
    setPotential(value);
  }, [currentPotential]);

  const onChangeLoyalty = (index: number) => {
    setCurrentPotential(potential[index]);
  };

  return (
    <div className='Potential'>
      <InputForm
        className='CustomInput'
        value={'Потенциал'}
        onChange={() => {}}
        label='Вопрос'
      />
      {potential.map((item, index) => (
        <div key={v1()} className='mb-10 flex items-center gap-x-20'>
          <div onClick={() => onChangeLoyalty(index)}>
            <CheckboxRound
              className='CustomCheckboxRound'
              isChecked={index === currentPotential.id}
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
