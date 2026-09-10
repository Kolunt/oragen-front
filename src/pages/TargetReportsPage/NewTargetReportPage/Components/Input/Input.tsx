import React, { useEffect, useState } from 'react';
import './styles.scss';
import classNames from 'classnames';
import { DefaultInputPropsType } from 'ui-kit/InputForm/InputForm';

type IInput = DefaultInputPropsType & {
  onInputComponent: (value: string, id: string | number) => void;
  sectionId: number | string;
};

export const Input: React.FC<IInput> = (props) => {
  const { onInputComponent, sectionId, ...rest } = props;
  const [title, setTitle] = useState(rest.value);

  useEffect(() => {
    onInputComponent(title as string, sectionId);
  }, [title]);

  return (
    <div className='w-full'>
      <input
        className={classNames('input', rest.className)}
        onBlur={rest.onBlur}
        onFocus={rest.onFocus}
        value={title}
        onInput={(e) => setTitle(e.currentTarget.value)}
        id={`${sectionId}`}
        placeholder={rest.placeholder}
      />
    </div>
  );
};
