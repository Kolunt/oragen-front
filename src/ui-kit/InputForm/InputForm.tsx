import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
} from 'react';

import classNames from 'classnames';
import './InputForm.scss';

export type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type InputFormProps = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
  label?: string;
};

export const InputForm: React.FC<InputFormProps> = (props) => {
  const {
    type,
    onChange,
    onChangeText,
    onKeyDown,
    onEnter,
    error,
    className,
    spanClassName,
    label,
    onBlur,
    onFocus,
    children,
    ...rest
  } = props;

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (onChangeText) onChangeText(e.currentTarget.value);
  };
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    // if (e.code === 'Minus') {
    //   e.preventDefault();
    // }

    if (onKeyDown) onKeyDown(e);

    if (onEnter) {
      if (e.key === 'Enter') onEnter();
    }
  };
  return (
    <div className={classNames('InputForm', className)}>
      {label && <label className='InputForm__Label'>{label}</label>}
      <input
        type={type}
        onChange={onChangeCallback}
        onKeyDown={onKeyPressCallback}
        onBlur={onBlur}
        onFocus={onFocus}
        className={
          error ? 'InputForm__Input InputForm__Error' : 'InputForm__Input'
        }
        // style={{ border: `1px solid ${error ? '#e64646' : '#e1e1e1'}` }}
        {...rest}
      />
      {children}
      {error && <span className='TextError'>{error}</span>}
    </div>
  );
};
