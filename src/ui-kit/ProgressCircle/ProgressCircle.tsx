import React, { FC } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ProgressCircle.scss';

export type ProgressCircleType = 'planed' | 'completed' | 'notCompleted';

interface ICircularProgressBar {
  value: number;
  maxValue: number;
  type?: ProgressCircleType;
}

const value = 1;
const maxValue = 5;

export const ProgressCircle: FC<ICircularProgressBar> = (props) => {
  const { value, maxValue, type = 'planed' } = props;

  let colorPath = '#818C99';
  if (value === maxValue) colorPath = '#4BB34B';
  if (value === 0 && value !== maxValue) colorPath = '#E64646';

  // if (type === 'completed') colorPath = '#4BB34B';
  // if (type === 'notCompleted') colorPath = '#E64646';

  return (
    <div className='ProgressCircle'>
      <CircularProgressbar
        value={value}
        maxValue={maxValue}
        text={`${value}/${maxValue}`}
        strokeWidth={6}
        styles={buildStyles({
          textSize: '40px',
          textColor: '#000',
          trailColor: '#E1E1E1',
          pathColor: colorPath,
        })}
      />
    </div>
  );
};
