import React, { FC } from 'react';
import { MultipleChoiceComponent } from '../MultipleChoiceComponent/MultipleChoiceComponent';
import classNames from 'classnames';

interface IOptions {
  label: string;
  id: string | number;
}

interface IMultipleChoiceGroup {
  options: IOptions[];
  onDelete: (id: string | number) => void;
  onAdd: () => void;
  onInput: (value: string, id: string | number) => void;
  iconRadio?: boolean;
}

export const MultipleChoiceGroup: FC<IMultipleChoiceGroup> = (props) => {
  const { options, onDelete, onAdd, onInput, iconRadio, ...other } = props;
  return (
    <div>
      {options.map(({ label, id }, index) => (
        <MultipleChoiceComponent
          key={id}
          id={id}
          className='mb-15'
          onDelete={() => onDelete(id)}
          onAdd={onAdd}
          label={label}
          onInput={onInput}
          showBtnDelete={options.length === 1}
          iconRadio={iconRadio}
          showBtnAdd={options.length === index + 1}
          {...other}
        />
      ))}
    </div>
  );
};
