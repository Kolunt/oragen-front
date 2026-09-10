import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
} from 'react';
import './CheckboxRound.scss';
import classNames from 'classnames';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type CheckboxPropsType = DefaultInputPropsType & {
  spanClassName?: string;
  label?: string;
  isChecked?: boolean;
  onChange?: () => void;
};

export const CheckboxRound: FC<CheckboxPropsType> = (props) => {
  const {
    type,
    onChange,
    className,
    spanClassName,
    label,
    isChecked,
    ...rest
  } = props;

  return (
    <label className={classNames('CheckboxRound', className)}>
      <input
        type='checkbox'
        className='real-radio'
        checked={isChecked}
        onChange={onChange}
        {...rest}
      />
      <span className='custom-radio' />
      {label && <span className='Label'>{label}</span>}
    </label>
  );
};
