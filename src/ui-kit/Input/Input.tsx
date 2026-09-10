import React, {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
} from 'react';

import classNames from 'classnames';
import './Input.scss';

export interface IInputProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  autoComplete?: string;
  name?: string;
  type?: string;
  error?: string;
  disabled?: boolean;
}

export const Input = forwardRef(
  (
    {
      className,
      autoComplete,
      name,
      type,
      error,
      disabled,
      ...rest
    }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        className={classNames(className, 'Input', {
          Input__error: error,
        })}
        autoComplete={autoComplete}
        name={name}
        type={type}
        ref={ref}
        disabled={disabled}
        {...rest}
      />
    );
  }
);

Input.displayName = 'Input';
