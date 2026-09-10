import { FC } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './SliderForm.scss';
import classNames from 'classnames';

interface ISlider {
  className?: string;
  value: number | number[];
  max: number;
  onChange: (value: number | number[]) => void;
}

export const SliderForm: FC<ISlider> = (props) => {
  const { className, value, max, onChange } = props;

  const trackStyle = {
    backgroundColor: '#deb373',
    height: 5,
  };

  const railStyle = {
    backgroundColor: '#818c99',
    height: 5,
  };

  return (
    <div className={classNames('SliderForm', className)}>
      <span className='Title'>{value}</span>
      <Slider
        className='Slider'
        value={value}
        onChange={onChange}
        min={0}
        max={max}
        step={1}
        trackStyle={trackStyle}
        railStyle={railStyle}
      />
      <span className='Title'>{max}</span>
    </div>
  );
};
