import React, { ChangeEvent, DetailedHTMLProps, HTMLAttributes } from 'react';
import classNames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import './TextArea.scss';

export interface ITextAreaProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string;
  error?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const TextArea: React.FC<ITextAreaProps> = (props) => {
  const { value, onChange, error, className, label, placeholder, disabled } =
    props;

  return (
    <div className={classNames('TextareaForm', className)}>
      {label && <label className='TextareaForm__Label'>{label}</label>}
      <TextareaAutosize
        value={value}
        onChange={onChange}
        className={
          error
            ? 'TextareaForm__Textarea TextareaForm__Error'
            : 'TextareaForm__Textarea'
        }
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <span className='Error'>{error}</span>}
    </div>
  );
};
